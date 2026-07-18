import Tooltip from "./Tooltip";

const RATES = [
  { label: "Slow", value: 0.75 },
  { label: "Normal", value: 1 },
  { label: "Fast", value: 1.5 },
];

export default function SpeechRateOption({ value, tooltip }) {
  return (
    <div className="ml-5 flex justify-between items-center bg-white/10 p-4 rounded-xl border border-white/20">
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
              className={`px-2.5 py-1 text-xs rounded-md transition cursor-pointer ${
                value === rate.value
                  ? "bg-amber-500 text-white font-semibold"
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
