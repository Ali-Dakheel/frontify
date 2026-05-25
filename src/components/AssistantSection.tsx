"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SendIcon, SparkleIcon } from "./icons";
import { SectionHead } from "./SectionHead";

const TURNS = [
  { from: "assistant" as const, text: "Hi there! Ask me about anything in the brand portal. I'll find an answer in the content you have access to." },
  { from: "user" as const, text: "Where can I find the latest social campaign template?" },
  { from: "assistant" as const, text: "I found 3 templates in the Social Digital folder, updated this week. The most recent is “Summer Launch — Instagram Stories.” Want me to open it?" },
  { from: "user" as const, text: "Yes, and adapt the copy for the German market." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export function AssistantSection() {
  // Progressively reveal chat messages as the user keeps the section in view.
  const [shown, setShown] = useState(1);
  useEffect(() => {
    if (shown >= TURNS.length) return;
    const id = window.setTimeout(() => setShown((n) => n + 1), 1700);
    return () => window.clearTimeout(id);
  }, [shown]);

  return (
    <section id="assistantSection" className="relative w-full bg-paper py-24 md:py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <SectionHead
          title={<>Work with your AI brand expert</>}
          subtitle="The Brand Assistant uses your guidelines to answer questions, locate files, and create on-brand content."
          cta={{ label: "Meet the Brand Assistant", href: "#" }}
        />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="mx-auto mt-12 w-[min(640px,92vw)] md:mt-14"
      >
        <div
          className="flex h-[480px] flex-col rounded-[28px] bg-white shadow-[0_30px_60px_-30px_rgba(17,17,16,0.18)]"
          style={{ border: "1px solid #e1e1db" }}
        >
          <header className="flex items-center justify-between px-5 py-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0c1a2e] text-white">
              <SparkleIcon className="h-3.5 w-3.5" />
            </span>
            <div className="flex items-center gap-2 text-ink-tertiary">
              <span className="h-1 w-1 rounded-full bg-current" />
              <span className="h-1 w-1 rounded-full bg-current" />
              <span className="h-1 w-1 rounded-full bg-current" />
            </div>
          </header>
          <div className="flex-1 space-y-3 overflow-hidden px-5 py-2">
            <AnimatePresence initial={false}>
              {TURNS.slice(0, shown).map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm " +
                    (t.from === "assistant" ? "bg-transparent text-ink" : "ml-auto bg-paper text-ink")
                  }
                >
                  {t.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <form
            className="m-3 flex items-center gap-2 rounded-full bg-paper px-4 py-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="h-9 flex-1 bg-transparent text-sm text-ink placeholder-ink-muted outline-none"
              placeholder="Type your query here"
            />
            <button
              type="submit"
              aria-label="Send"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b60ae3] text-white"
            >
              <SendIcon className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
