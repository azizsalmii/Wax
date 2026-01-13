import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer";     // ✅ chemin correct
import Preloader from "../Preloader"; // ✅ ton preloader

export default function Layout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ montre le preloader à chaque refresh
    const t = setTimeout(() => setLoading(false), 1400); 
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {loading && <Preloader />}   {/* ✅ Preloader au top */}
      <Navbar />
      <main style={{ minHeight: "60vh" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
