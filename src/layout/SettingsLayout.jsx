export default function SettingsLayout({ children }) {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="relative w-[90%] max-w-3xl max-h-[90vh] overflow-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.3)] pt-10 pb-10 px-10 flex flex-col gap-8">
        {children}
      </div>
    </div>
  );
}
