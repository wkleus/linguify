import React from "react";
import { Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import EntryPage from "./pages/EntryPage";
import TranslatorPage from "./pages/TranslatorPage";
import HelpPage from "./pages/HelpPage";
import AboutAppPage from "./pages/AboutAppPage";
import SettingsPage from "./pages/SettingsPage";
import ContactPage from "./pages/ContactPage";
import SynonymFinderPage from "./pages/SynonymFinder";

const App = () => {
  return (
    <Routes>
      {/* Start(Home) Page */}
      <Route
        path="/"
        element={
          <div className="text-white w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center">
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

      {/* Abot App Page */}
      <Route path="/about-app" element={<AboutAppPage />} />

      {/* Settings Page */}
      <Route path="/settings" element={<SettingsPage />} />

      {/* Contact Page */}
      <Route path="/contact" element={<ContactPage />} />

      {/* Synonym Finder Page */}
      <Route path="/synonym-finder" element={<SynonymFinderPage />} />
    </Routes>
  );
};

export default App;
