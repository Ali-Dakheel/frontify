#!/usr/bin/env node
// Crawl the live homepage HTML and the rendered DOM hints to enumerate every
// asset URL we need to mirror, plus all @font-face URLs from the linked stylesheets.
//
// Usage:  node scripts/discover-assets.mjs
// Output: scripts/_assets.json  (image list, video list, font list)
import fs from "node:fs/promises";
import path from "node:path";

const PAGE = "https://www.frontify.com/en";
const ROOT = process.cwd();

async function fetchText(url) {
  const r = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
    },
  });
  if (!r.ok) throw new Error(`${url} -> ${r.status}`);
  return r.text();
}

const ALLOWED_HOSTS = new Set([
  "cdn.prod.website-files.com",
  "media.ffycdn.net",
]);

function uniq(arr) {
  return [...new Set(arr)];
}

(async () => {
  const html = await fetchText(PAGE);

  // 1. Stylesheet links from <head>
  const cssLinks = uniq(
    [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/g)]
      .map((m) => m[1])
      .filter((u) => u.startsWith("http") || u.startsWith("//"))
      .map((u) => (u.startsWith("//") ? "https:" + u : u))
  );

  // 2. Image srcs from <img>
  const imageSrcs = uniq([
    ...[...html.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map((m) => m[1]),
    ...[...html.matchAll(/<img[^>]+srcset=["']([^"']+)["']/g)].flatMap((m) =>
      m[1]
        .split(",")
        .map((s) => s.trim().split(/\s+/)[0])
        .filter(Boolean)
    ),
    ...[...html.matchAll(/<source[^>]+srcset=["']([^"']+)["']/g)].flatMap((m) =>
      m[1].split(",").map((s) => s.trim().split(/\s+/)[0]).filter(Boolean)
    ),
  ]).filter(Boolean).filter((u) => u.startsWith("http") || u.startsWith("//"))
    .map((u) => (u.startsWith("//") ? "https:" + u : u));

  // Keep only allowed CDNs
  const images = imageSrcs
    .map((u) => u.split("?")[0])
    .filter((u) => {
      try {
        return ALLOWED_HOSTS.has(new URL(u).hostname);
      } catch {
        return false;
      }
    });

  // 3. Video srcs from <video> and <source type="video/*">
  const videos = uniq(
    [
      ...[...html.matchAll(/<video[^>]+src=["']([^"']+)["']/g)].map((m) => m[1]),
      ...[...html.matchAll(/<source[^>]+src=["']([^"']+\.(?:mp4|webm))["']/g)].map((m) => m[1]),
      ...[...html.matchAll(/<source[^>]+type=["']video\/[^"']+["'][^>]+src=["']([^"']+)["']/g)].map(
        (m) => m[1]
      ),
      ...[...html.matchAll(/<source[^>]+src=["']([^"']+)["'][^>]+type=["']video\/[^"']+["']/g)].map(
        (m) => m[1]
      ),
    ].map((u) => (u.startsWith("//") ? "https:" + u : u)).filter(Boolean)
  );

  // 4. Poster images
  const posters = uniq(
    [...html.matchAll(/<video[^>]+poster=["']([^"']+)["']/g)]
      .map((m) => m[1])
      .map((u) => (u.startsWith("//") ? "https:" + u : u))
  );

  // 5. Inline-style background-image URLs
  const inlineBgs = uniq(
    [...html.matchAll(/background(?:-image)?:\s*url\(["']?([^"')]+)["']?\)/g)]
      .map((m) => m[1])
      .map((u) => (u.startsWith("//") ? "https:" + u : u))
      .filter((u) => u.startsWith("http"))
  );

  // 6. Pull stylesheet contents, extract @font-face urls + background-image urls
  const fontFaceUrls = new Set();
  const cssBgUrls = new Set();
  for (const css of cssLinks) {
    if (!css.includes("frontify") && !css.includes("website-files")) continue;
    try {
      const text = await fetchText(css);
      const fontMatches = text.matchAll(
        /@font-face\s*{[^}]*src:\s*url\(["']?([^"')]+\.(?:woff2|woff|ttf|otf))["']?\)[^}]*}/g
      );
      for (const m of fontMatches) fontFaceUrls.add(m[1]);
      const bgMatches = text.matchAll(/url\(["']?([^"')]+\.(?:png|jpe?g|svg|webp|avif))["']?\)/g);
      for (const m of bgMatches) cssBgUrls.add(m[1]);
    } catch (e) {
      console.warn("skip", css, e.message);
    }
  }

  const result = {
    page: PAGE,
    stylesheets: cssLinks,
    images: uniq([...images, ...inlineBgs, ...cssBgUrls]).filter((u) => {
      try {
        return ALLOWED_HOSTS.has(new URL(u).hostname);
      } catch {
        return false;
      }
    }),
    videos,
    posters,
    fonts: [...fontFaceUrls],
  };

  const outPath = path.join(ROOT, "scripts", "_assets.json");
  await fs.writeFile(outPath, JSON.stringify(result, null, 2));
  console.log(`Wrote ${outPath}`);
  console.log(
    `images: ${result.images.length} | videos: ${result.videos.length} | posters: ${result.posters.length} | fonts: ${result.fonts.length}`
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
