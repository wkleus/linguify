import Tooltip from "./Tooltip";

export default function SettingsOption({ label, checked, onChange, tooltip }) {
  return (
    <div className="ml-5 flex justify-between items-center bg-white/10 p-4 rounded-xl border border-white/20">
      {/* Label text */}
      <span className="flex items-center text-sm sm:text-[15px]">{label}</span>

      {/* Checkbox wrapped in tooltip */}
      <Tooltip text={tooltip} position="left">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-5 h-5 cursor-pointer"
        />
      </Tooltip>
    </div>
  );
}
