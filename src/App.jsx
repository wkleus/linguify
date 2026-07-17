import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import EntryPage from "./pages/EntryPage";

// Lazy-loaded: only fetched when user actually navigates to that route,
// instead of bundling every page into the initial chunk
const MenuPage = lazy(() => import("./pages/MenuPage"));
const TranslatorPage = lazy(() => import("./pages/TranslatorPage"));
const HelpPage = lazy(() => import("./pages/HelpPage"));
const AboutAppPage = lazy(() => import("./pages/AboutAppPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const SynonymFinderPage = lazy(() => import("./pages/SynonymFinder"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Shown briefly while lazy route chunk is being fetched
function RouteFallback() {
  return (
    <div className="w-full h-screen bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
}

const App = () => {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Start(Home) Page - not lazy-loaded, it's the first user sees */}
        <Route
          path="/"
          element={
            <div className="text-white w-full h-screen bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center">
              <div className="w-[90%] max-w-5xl h-[70vh] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.3)] flex flex-col justify-center items-center p-10">
                <EntryPage />
              </div>
            </div>
          }
        />

        {/* Menu Page */}
        <Route path="/menu" element={<MenuPage />} />

        {/* Translator Page */}
        <Route path="/translator" element={<TranslatorPage />} />

        {/* Help Page */}
        <Route path="/help" element={<HelpPage />} />

        {/* About App Page */}
        <Route path="/about-app" element={<AboutAppPage />} />

        {/* Settings Page */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* Contact Page */}
        <Route path="/contact" element={<ContactPage />} />

        {/* Synonym Finder Page */}
        <Route path="/synonym-finder" element={<SynonymFinderPage />} />

        {/* 404 – catches every unknown path */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
