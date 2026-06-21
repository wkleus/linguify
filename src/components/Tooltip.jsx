export default function Tooltip({ children, text, position = "top" }) {
  return (
    <div className="relative group inline-flex items-center cursor-default">
      {/* Element that triggers the tooltip */}
      {children}

      {/* Tooltip box with dynamic positioning */}
      <div
        className={`
          absolute w-max max-w-60 bg-black/80 text-orange-400 text-xs font-playful
          px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 
          transition-opacity duration-500 pointer-events-none z-50
          ${
            position === "top"
              ? "left-1/2 -translate-x-1/2 -top-8"
              : position === "bottom"
                ? "left-1/2 -translate-x-1/2 top-6"
                : position === "left"
                  ? "right-full mr-2 top-1/2 -translate-y-1/2"
                  : "left-full ml-2 top-1/2 -translate-y-1/2"
          }
        `}
      >
        {text}
      </div>
    </div>
  );
}
