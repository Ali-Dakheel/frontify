#!/usr/bin/env node
// Download every asset listed in scripts/_assets.json into public/ subfolders.
//
// Mapping:
//   images  -> public/images/frontify/<slug>
//   videos  -> public/videos/frontify/<slug>
//   posters -> public/videos/frontify/posters/<slug>
//   fonts   -> public/fonts/<slug>
//
// Slugs are derived from the URL path's basename. Webflow asset IDs are
// stripped to give human-readable names.
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const MANIFEST = path.join(ROOT, "scripts", "_assets.json");
const CONCURRENCY = 6;

function decodePart(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function slugFor(url, kind) {
  const u = new URL(url);
  const raw = decodePart(u.pathname.split("/").pop() || "asset");
  // Webflow basenames are like "<24-hex-id>_<actual-name>.<ext>" — strip the prefix.
  const stripped = raw.replace(/^[0-9a-f]{24}_/i, "");
  let name = stripped
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  // Append a short hash if the name lost too much info (e.g., just "hero.avif")
  // to avoid name collisions.
  return name;
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function download(url, dest) {
  try {
    const r = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
      },
    });
    if (!r.ok) {
      console.warn(`SKIP ${r.status} ${url}`);
      return false;
    }
    const buf = Buffer.from(await r.arrayBuffer());
    await fs.writeFile(dest, buf);
    return true;
  } catch (e) {
    console.warn(`ERR ${url}: ${e.message}`);
    return false;
  }
}

async function processBatch(items, dir, label) {
  await ensureDir(dir);
  let ok = 0,
    skipped = 0;
  const seen = new Set();
  // Build job list with computed paths first, dedup by destination
  const jobs = [];
  for (const url of items) {
    let slug = slugFor(url);
    let dest = path.join(dir, slug);
    // If slug already taken, prefix with first 8 chars of the asset ID
    let n = 0;
    while (seen.has(dest)) {
      const id = (url.match(/\/([0-9a-f]{24})_/i)?.[1] || `${++n}`).slice(0, 8);
      slug = `${id}-${slugFor(url)}`;
      dest = path.join(dir, slug);
    }
    seen.add(dest);
    jobs.push({ url, dest, slug });
  }
  // Concurrent download with simple semaphore
  let cursor = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (cursor < jobs.length) {
        const j = jobs[cursor++];
        // Skip if already present and non-empty
        try {
          const st = await fs.stat(j.dest);
          if (st.size > 0) {
            skipped++;
            continue;
          }
        } catch {}
        const success = await download(j.url, j.dest);
        if (success) ok++;
      }
    })
  );
  console.log(`${label}: ${ok} downloaded, ${skipped} skipped (already exist) / ${jobs.length} total`);
  return jobs;
}

(async () => {
  const m = JSON.parse(await fs.readFile(MANIFEST, "utf8"));
  const imageJobs = await processBatch(m.images || [], path.join(ROOT, "public/images/frontify"), "images");
  const videoJobs = await processBatch(m.videos || [], path.join(ROOT, "public/videos/frontify"), "videos");
  const posterJobs = await processBatch(
    m.posters || [],
    path.join(ROOT, "public/videos/frontify/posters"),
    "posters"
  );
  const fontJobs = await processBatch(m.fonts || [], path.join(ROOT, "public/fonts"), "fonts");
  // Write a manifest mapping public path -> source url for reference in builder agents
  const map = {
    images: Object.fromEntries(imageJobs.map((j) => [`/images/frontify/${j.slug}`, j.url])),
    videos: Object.fromEntries(videoJobs.map((j) => [`/videos/frontify/${j.slug}`, j.url])),
    posters: Object.fromEntries(posterJobs.map((j) => [`/videos/frontify/posters/${j.slug}`, j.url])),
    fonts: Object.fromEntries(fontJobs.map((j) => [`/fonts/${j.slug}`, j.url])),
  };
  await fs.writeFile(path.join(ROOT, "scripts", "_asset-map.json"), JSON.stringify(map, null, 2));
  console.log("Wrote scripts/_asset-map.json");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
