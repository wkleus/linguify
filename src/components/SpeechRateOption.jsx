import Tooltip from "./Tooltip";

const RATES = [
  { label: "Slow", value: "slow" },
  { label: "Normal", value: "normal" },
  { label: "Fast", value: "fast" },
];

export default function SpeechRateOption({ value, onChange, tooltip }) {
  return (
    <div className="ml-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/20">
      <span className="flex items-center text-sm sm:text-[15px]">
        Text-to-speech rate
      </span>

      <Tooltip text={tooltip} position="left">
        <div className="flex gap-1">
          {RATES.map((rate) => (
            <button
              key={rate.value}
              type="button"
              onClick={() => onChange(rate.value)}
              className={`px-2.5 py-1 border border-white/20 text-xs rounded-md transition cursor-pointer ${
                value === rate.value
                  ? "bg-blue-500 border-white/50 text-white/90 font-medium"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {rate.label}
            </button>
          ))}
        </div>
      </Tooltip>
    </div>
  );
}
