export default function ErrorBox({ error }) {
  // If no error exists, render nothing
  if (!error) return null;

  return (
    // Simple styled error message box
    <div className="mt-4 text-slate-100 text-sm bg-red-900/50 px-4 py-2 rounded-lg">
      {error}
    </div>
  );
}
