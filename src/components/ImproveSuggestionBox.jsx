export default function ImproveSuggestionBox({
  improvedText,
  onApply,
  onDismiss,
}) {
  if (!improvedText) return null;

  return (
    <div className="w-full sm:px-[3rem] md:px-[1rem] lg:px-[2rem] xl:px-[3rem] mt-5 -mb-8">
      <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-wide text-orange-300">
          AI suggestion
        </span>
        <p className="text-sm text-slate-100">{improvedText}</p>
        <div className="flex gap-1.5 justify-end">
          <button
            onClick={onDismiss}
            className="text-xs text-slate-200 hover:text-white bg-black/40 hover:bg-black/30 px-1.5 py-1 rounded-md transition cursor-pointer"
          >
            Dismiss
          </button>
          <button
            onClick={onApply}
            className="text-xs text-slate-900 bg-green-300 hover:bg-green-200 px-1.5 py-1 rounded-md transition cursor-pointer font-medium"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
