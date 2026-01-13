import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardHome from "./pages/DashboardHome";
import Products from "./pages/product/Products";
import Orders from "./pages/Orders";
import Reclamations from "./pages/Reclamations";
import Feedback from "./pages/feedback/Feedback";

import Sidebar from "./components/sidebar/Sidebar";
import "./styles.css";

// 👉 Nouvelle page CRUD collections
import CollectionsPage from "./pages/collection/Collection";

// (Optionnel) ancienne page si tu veux la garder
import Collection from "./pages/collection/Collection";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/produits" element={<Products />} />
            <Route path="/commandes" element={<Orders />} />
            <Route path="/reclamations" element={<Reclamations />} />

            {/* ✅ Nouvelle route officielle CRUD */}
            <Route path="/collections" element={<CollectionsPage />} />

            {/* ✅ (Optionnel) garder l’ancienne route si elle te sert */}
            <Route path="/collection" element={<Collection />} />

            <Route path="/feedbacks" element={<Feedback />} />

            {/* ✅ fallback simple */}
            <Route path="*" element={<DashboardHome />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
