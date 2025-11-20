import React from 'react'
import ProductCard from '../ProductCard'

export default function RecentProducts({ produits=[] }){
  if (!produits.length) return <div className="muted">Aucun produit récent</div>
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:12}}>
      {produits.map(p=> <ProductCard key={p._id} produit={p} />)}
    </div>
  )
}
