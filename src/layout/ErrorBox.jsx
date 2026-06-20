export default function ErrorBox({ error }) {
  return (
    <div
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-100 text-sm bg-red-900/50 px-4 py-2 rounded-lg transition-opacity duration-200 pointer-events-none ${
        error ? "opacity-100" : "opacity-0"
      }`}
    >
      {error || " "}
    </div>
  );
}
