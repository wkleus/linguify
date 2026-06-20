export default function CopyNotification({ visible }) {
  return (
    <div
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-green-200 text-md font-bold transition-opacity duration-200 pointer-events-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      Copied to clipboard!
    </div>
  );
}
