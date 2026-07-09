import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ImproveSuggestionBox({
  improvedText,
  onApply,
  onDismiss,
}) {
  const containerRef = useRef(null);

  // TranslatorLayout's content area is a fixed-height, scrollable container
  // (overflow-y-auto). Without this, the box can render below the visible
  // area and the user never sees it after clicking the improve button.
  useEffect(() => {
    if (improvedText && containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [improvedText]);

  return (
    <AnimatePresence>
      {improvedText && (
        <motion.div
          key="improve-suggestion"
          ref={containerRef}
          variants={{
            hidden: {
              height: 0,
              opacity: 0,
              transition: { duration: 0.25, ease: "easeIn" },
            },
            visible: {
              height: "auto",
              opacity: 1,
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="w-full sm:px-15 overflow-hidden"
        >
          <motion.div
            initial={{ y: -6, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.3, delay: 0.1 },
            }}
            exit={{ y: -6, opacity: 0, transition: { duration: 0.15 } }}
            className="mt-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3 flex flex-col gap-2"
          >
            <span className="text-xs uppercase tracking-wide text-orange-300">
              AI suggestion
            </span>
            <p className="text-sm text-slate-100">{improvedText}</p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={onDismiss}
                className="text-xs text-slate-300 hover:text-white bg-black/20 hover:bg-black/30 px-3 py-1 rounded-md transition cursor-pointer"
              >
                Dismiss
              </button>
              <button
                onClick={onApply}
                className="text-xs text-slate-900 bg-green-300 hover:bg-green-200 px-3 py-1 rounded-md transition cursor-pointer font-medium"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
