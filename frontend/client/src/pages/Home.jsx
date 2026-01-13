import React, { useEffect, useState } from "react";

import Hero from "../components/hero/Hero";
import CollectionCircles from "../components/collections/CollectionCircles";
import BestSellers from "../components/bestSellers/BestSellers";
import CategoryTiles from "../components/categoryTiles/CategoryTiles";

import Categories from "../components/Categories";
import RecentProducts from "../components/recentProducts/RecentProducts";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

import TrackBanner from "../components/trackBanner/TrackBanner"; 
import AboutWax from "../components/aboutWax/AboutWax"; // 🌟 Nouvelle section About

import api from "../services/api";

export default function Home() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    api.fetchProduits().then(setProduits).catch(() => {});
  }, []);

  const categories = Array.from(
    new Set(produits.map((p) => p.categorie).filter(Boolean))
  );

  const recents = produits
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div>

      {/* ===================== HERO ===================== */}
      <Hero />

      {/* Track Banner */}
      <TrackBanner />

      {/* ===================== COLLECTION CIRCLES ===================== */}
      <CollectionCircles />

      {/* Track Banner */}
      <TrackBanner />

      {/* ===================== BEST SELLERS ===================== */}
      <BestSellers />

      {/* Track Banner */}
      <TrackBanner />

      {/* ===================== CATEGORY TILES ===================== */}
      <CategoryTiles />

      

    </div>
  );
}
