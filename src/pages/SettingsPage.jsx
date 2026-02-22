import { useNavigate } from "react-router-dom";

import SettingsLayout from "../layout/SettingsLayout";
import SettingsHeader from "../layout/SettingsHeader";
import SettingsOption from "../components/SettingsOption";

import useSettings from "../hooks/useSettings";
import Tooltip from "../components/Tooltip";

export default function SettingsPage() {
  const navigate = useNavigate();

  const {
    autoClearInstant,
    autoClearDelay,
    autoCopy,
    setAutoClearInstant,
    setAutoClearDelay,
    setAutoCopy,
    saveSettings,
  } = useSettings();

  const handleSave = () => {
    saveSettings();
    navigate("/menu");
  };

  return (
    <SettingsLayout>
      <SettingsHeader />

      <div className="flex flex-col gap-6 text-white text-lg">
        <div className="font-bold">Auto-clear:</div>

        {/* setAutoClearInstant automatically disables autoClearDelay (in Context) */}
        <SettingsOption
          label="Auto‑clear input immediately after translation"
          tooltip="Automatically clears the input field as soon as the translation is done."
          checked={autoClearInstant}
          onChange={() => setAutoClearInstant(!autoClearInstant)}
        />

        <SettingsOption
          label="Auto-clear input 3 seconds after translation"
          tooltip="Clears the input field three seconds after the translation is finished."
          checked={autoClearDelay}
          onChange={() => setAutoClearDelay(!autoClearDelay)}
        />

        <div className="font-bold">Auto-copy:</div>

        <SettingsOption
          label="Auto-copy output"
          tooltip="Copies the translation to your clipboard automatically."
          checked={autoCopy}
          onChange={() => setAutoCopy(!autoCopy)}
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-amber-600 text-lg text-white font-bold py-3 rounded-xl hover:scale-105 transition cursor-pointer"
        style={{ WebkitTextStroke: "0.2px rgba(0,0,0,0.5)" }}
      >
        Save Settings
      </button>
    </SettingsLayout>
  );
}
