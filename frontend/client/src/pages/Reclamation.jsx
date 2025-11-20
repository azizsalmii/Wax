import React, { useState } from 'react'

export default function Reclamation(){
  const [form, setForm] = useState({ contact:'', message:'', contactType: 'email' })
  const [status, setStatus] = useState(null)

  function handleChange(e){
    const { name, value } = e.target
    setForm(prev=>({ ...prev, [name]: value }))
  }

  function handleContactType(t){
    setForm(prev=>({ ...prev, contactType: t, contact: '' }))
  }

  async function submit(e){
    e.preventDefault()
    if (!form.contact || !form.message) {
      setStatus('Veuillez remplir le contact et le message.')
      return
    }
    try{
      const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'
      const payload = { contact: form.contact, message: form.message }
      const res = await fetch(`${BASE}/reclamations`,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('Erreur')
      setStatus('Envoyé — merci')
      setForm({ contact:'', message:'', contactType: form.contactType })
    }catch(e){
      console.error(e)
      setStatus('Erreur lors de l\'envoi')
    }
  }

  return (
    <div className="container" style={{paddingTop:18}}>
      <h2>Réclamation</h2>
      <p>Choisissez si vous voulez laisser votre email ou votre numéro puis saisissez votre message.</p>
      <form onSubmit={submit} style={{maxWidth:700,display:'grid',gap:8,marginTop:8}}>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <label style={{display:'flex',gap:6,alignItems:'center'}}>
            <input type="radio" name="contactType" checked={form.contactType==='email'} onChange={()=>handleContactType('email')} />
            <span>Email</span>
          </label>
          <label style={{display:'flex',gap:6,alignItems:'center'}}>
            <input type="radio" name="contactType" checked={form.contactType==='phone'} onChange={()=>handleContactType('phone')} />
            <span>Téléphone</span>
          </label>
        </div>

        {form.contactType === 'email' ? (
          <input name="contact" type="email" placeholder="Votre email" value={form.contact} onChange={handleChange} className="form-input" required />
        ) : (
          <input name="contact" type="tel" placeholder="Votre numéro de téléphone" value={form.contact} onChange={handleChange} className="form-input" required />
        )}

        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} rows={6} className="form-input" required />
        <div>
          <button className="btn btn-primary" type="submit">Envoyer</button>
        </div>
      </form>
      {status && <div style={{marginTop:12}}>{status}</div>}
    </div>
  )
}
