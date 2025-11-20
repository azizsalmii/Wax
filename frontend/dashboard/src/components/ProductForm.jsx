import React, { useState, useEffect } from 'react'

export default function ProductForm({ onSubmit, initial }){
  const [form, setForm] = useState({ nom:'', description:'', prix:'', stock:'', categorie:'autre', image:'' })
  const [file, setFile] = useState(null)

  useEffect(()=>{
    if (initial) setForm({ nom: initial.nom||'', description: initial.description||'', prix: initial.prix||'', stock: initial.stock||0, categorie: initial.categorie||'autre', image: initial.image||'' })
  },[initial])

  function handleChange(e){
    const { name, value } = e.target
    setForm(prev=>({ ...prev, [name]: value }))
  }

  function handleFile(e){
    const f = e.target.files && e.target.files[0]
    setFile(f || null)
  }

  function submit(e){
    e.preventDefault()
    const payload = { ...form, prix: parseFloat(form.prix||0), stock: parseInt(form.stock||0,10) }
    // if a file is selected, build FormData for upload
    if (file) {
      const fd = new FormData()
      fd.append('nom', payload.nom)
      fd.append('description', payload.description)
      fd.append('prix', payload.prix)
      fd.append('stock', payload.stock)
      fd.append('categorie', payload.categorie)
      // allow existing image url value too
      if (payload.image) fd.append('image', payload.image)
      fd.append('image', file)
      onSubmit(fd)
    } else {
      onSubmit(payload)
    }
    setForm({ nom:'', description:'', prix:'', stock:'', categorie:'autre', image: '' })
    setFile(null)
  }

  return (
    <form onSubmit={submit} className="container-card">
      <div className="form-row">
        <input className="form-input" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
        <input className="form-input" name="categorie" placeholder="Catégorie (pantalon, pull, eventail, autre)" value={form.categorie} onChange={handleChange} />
        <input className="form-input" name="prix" placeholder="Prix" value={form.prix} onChange={handleChange} required />
        <input className="form-input" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
      </div>
      <div style={{marginTop:8, display:'flex', gap:8, alignItems:'center'}}>
        <input type="file" accept="image/*" onChange={handleFile} />
        <input className="form-input" name="image" placeholder="Ou: Image URL (https://...)" value={form.image} onChange={handleChange} />
      </div>
      <div style={{marginTop:8}}>
        <textarea className="form-input" name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={3} />
      </div>
      <div style={{marginTop:12,display:'flex',gap:8}}>
        <button className="btn btn-primary" type="submit">Enregistrer</button>
        <button type="button" className="btn btn-ghost" onClick={()=>setForm({ nom:'', description:'', prix:'', stock:'', categorie:'autre' })}>Réinitialiser</button>
      </div>
    </form>
  )
}
