import { MdClose } from "react-icons/md";
import { IoBuildSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function SettingsHeader() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <>
      {/* Title of the settings page */}
      <div className="flex items-center justify-center gap-3 mt-2 mb-2 text-yellow-50/90 ">
        <IoBuildSharp
          className=" text-3xl"
          style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.3))" }}
        />
        <h1
          className="font-playful text-center uppercase font-semibold text-2xl sm:text-3xl tracking-tight sm:tracking-wide md:text-2xl 3xl:text-3xl font-playful"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
        >
          Settings
        </h1>
      </div>
      {/* Close button that navigates back to /menu */}
      <button className="close" onClick={() => navigate("/menu")}>
        <MdClose className="size-4 sm:size-5" />
      </button>
    </>
  );
}
