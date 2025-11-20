import React, { useEffect, useState } from 'react'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

export default function AllProducts(){
  const [produits,setProduits] = useState([])
  useEffect(()=>{ api.fetchProduits().then(setProduits).catch(()=>{}) },[])
  return (
    <div className="container">
      <h2>Tous les produits</h2>
      <div className="product-grid" style={{marginTop:12}}>
        {produits.map(p=> <ProductCard key={p._id} produit={p} />)}
      </div>
    </div>
  )
}
