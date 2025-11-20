import React, {useEffect, useState} from 'react'
import ProductCard from '../components/ProductCard'
import Hero from '../components/hero/Hero'
import Footer from '../components/Footer'
import api from '../services/api'
import Categories from '../components/Categories'
import CategoryTiles from '../components/categoryTiles/CategoryTiles'
import RecentProducts from '../components/recentProducts/RecentProducts'
import CollectionCircles from "../components/collections/CollectionCircles";

export default function Home(){
  const [produits, setProduits] = useState([])

  useEffect(()=>{
    api.fetchProduits().then(setProduits).catch(()=>{})
  },[])

  // derive categories and recents
  const categories = Array.from(new Set(produits.map(p=>p.categorie).filter(Boolean)))
  const recents = produits.slice().sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)).slice(0,6)

  return (
    <div>
      <Hero />
      <CollectionCircles />
      <div className="container">
        <section style={{marginTop:18}}>
          
          <CategoryTiles />
        </section>

        <section style={{marginTop:18}}>
          <h2>Catégories</h2>
          <Categories categories={categories} />
        </section>

        <section style={{marginTop:28}}>
          <h2>Produits récents</h2>
          <RecentProducts produits={recents} />
        </section>

        <section style={{marginTop:28}}>
          <h2>Tous les produits</h2>
          <div className="product-grid">
            {produits.map(p=> <ProductCard key={p._id} produit={p} />)}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
