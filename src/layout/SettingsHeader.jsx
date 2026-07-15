import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function SettingsHeader() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <>
      {/* Title of the settings page */}
      <h1 className="uppercase font-bold text-3xl text-amber-400 tracking-wide text-center">
        Settings
      </h1>

      {/* Close button that navigates back to /menu */}
      <button className="close" onClick={() => navigate("/menu")}>
        <MdClose className="size-3 sm:size-6 " />
      </button>
    </>
  );
}
