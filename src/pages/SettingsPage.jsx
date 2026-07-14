import SettingsLayout from "../layout/SettingsLayout";
import SettingsHeader from "../layout/SettingsHeader";
import SettingsOption from "../components/SettingsOption";

import useSettings from "../hooks/useSettings";

export default function SettingsPage() {
  const {
    autoClearInstant,
    autoClearDelay,
    autoCopy,
    setAutoClearInstant,
    setAutoClearDelay,
    setAutoCopy,
    liveTranslation,
    setLiveTranslation,
  } = useSettings();

  return (
    <SettingsLayout>
      <SettingsHeader />

      <div className="flex flex-col gap-5 text-white text-lg">
        <div className="font-bold text-sm sm:text-lg">Auto-clear:</div>

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

        <div className="font-bold text-sm sm:text-lg">Auto-copy:</div>

        <SettingsOption
          label="Auto-copy output"
          tooltip="Copies the translation to your clipboard automatically."
          checked={autoCopy}
          onChange={() => setAutoCopy(!autoCopy)}
        />

        <div className="font-bold text-sm sm:text-lg">Live Translation:</div>

        <SettingsOption
          label="Live translation"
          tooltip="When the user types, the app automatically translates after a brief pause."
          checked={liveTranslation}
          onChange={() => setLiveTranslation(!liveTranslation)}
        />
      </div>
    </SettingsLayout>
  );
}
