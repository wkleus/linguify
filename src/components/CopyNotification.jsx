export default function CopyNotification({ visible }) {
  // Only show notification when visible
  if (!visible) return null;

  return (
    <div className="mt-3 text-green-200 text-md font-bold">
      Copied to clipboard!
    </div>
  );
}
