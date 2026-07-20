import SettingsLayout from "../layout/SettingsLayout";
import SettingsHeader from "../layout/SettingsHeader";
import SettingsOption from "../components/SettingsOption";
import SpeechRateOption from "../components/SpeechRateOption";
import DefaultLanguageOption from "../components/DefaultLanguageOption";

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
    speechRate,
    setSpeechRate,
    defaultSourceLanguage,
    defaultTargetLanguage,
    setDefaultSourceLanguage,
    setDefaultTargetLanguage,
  } = useSettings();

  return (
    <SettingsLayout>
      <SettingsHeader />

      <div className="flex flex-col gap-4 text-white text-sm md:text-[16px]">
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

        <div className="font-bold ">Auto-copy:</div>

        <SettingsOption
          label="Auto-copy output"
          tooltip="Copies the translation to your clipboard automatically."
          checked={autoCopy}
          onChange={() => setAutoCopy(!autoCopy)}
        />

        <div className="font-bold ">Default languages:</div>

        <DefaultLanguageOption
          sourceLanguage={defaultSourceLanguage}
          targetLanguage={defaultTargetLanguage}
          onSourceChange={setDefaultSourceLanguage}
          onTargetChange={setDefaultTargetLanguage}
        />

        <div className="font-bold">Live Translation:</div>

        <SettingsOption
          label="Live translation"
          tooltip="When the user types, the app automatically translates after a brief pause."
          checked={liveTranslation}
          onChange={() => setLiveTranslation(!liveTranslation)}
        />

        <div className="font-bold">Text-to-Speech:</div>

        <SpeechRateOption
          value={speechRate}
          onChange={setSpeechRate}
          tooltip="Controls how fast the text is read aloud."
        />
      </div>
    </SettingsLayout>
  );
}
