import React, { useEffect, useState } from 'react'
import api from '../services/api'
import ProductForm from '../components/ProductForm'

export default function Products(){
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true)
    try{
      const data = await api.getProduits()
      setItems(data)
    }catch(e){
      console.error(e)
      setItems([])
    }finally{ setLoading(false) }
  }

  useEffect(()=>{ load() },[])

  async function handleCreate(payload){
    try{
      await api.createProduit(payload)
      await load()
    }catch(e){ console.error(e); alert('Erreur création') }
  }

  async function handleUpdate(id,payload){
    try{
      await api.updateProduit(id,payload)
      setEditing(null)
      await load()
    }catch(e){ console.error(e); alert('Erreur mise à jour') }
  }

  async function handleDelete(id){
    if (!confirm('Supprimer ce produit ?')) return
    try{
      await api.deleteProduit(id)
      await load()
    }catch(e){ console.error(e); alert('Erreur suppression') }
  }

  return (
    <div style={{padding:16}}>
      <h2>Gestion des produits</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:16,marginTop:12}}>
        <div>
          <h3>{editing ? 'Modifier un produit' : 'Ajouter un produit'}</h3>
          <ProductForm initial={editing || undefined} onSubmit={(payload)=> editing ? handleUpdate(editing._id,payload) : handleCreate(payload)} />
          {editing && <div style={{marginTop:8}}><button className="btn btn-ghost" onClick={()=>setEditing(null)}>Annuler</button></div>}
        </div>
        <div>
          <h3>Liste des produits</h3>
          {loading ? <div>Chargement...</div> : (
            <div className="container-card">
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{textAlign:'left',borderBottom:'1px solid #eee'}}><th></th><th>Nom</th><th>Prix</th><th>Stock</th><th>Catégorie</th><th></th></tr>
                </thead>
                <tbody>
                  {items.length===0 ? (
                    <tr><td colSpan={6} style={{padding:12}}>Aucun produit</td></tr>
                  ) : items.map(p=> (
                    <tr key={p._id} style={{borderBottom:'1px solid #f0f0f0'}}>
                      <td style={{padding:8}}><div className="product-image" style={{backgroundImage:`url(${p.image || (p.images && p.images[0]) || '/logo.svg'})`}} /></td>
                      <td style={{padding:8}}>{p.nom}</td>
                      <td style={{padding:8}}>{p.prix}</td>
                      <td style={{padding:8}}>{p.stock}</td>
                      <td style={{padding:8}}>{p.categorie}</td>
                      <td style={{padding:8}} className="table-actions">
                        <button className="btn" onClick={()=>setEditing(p)} style={{marginRight:8}}>✎</button>
                        <button className="btn btn-danger" onClick={()=>handleDelete(p._id)}>🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
