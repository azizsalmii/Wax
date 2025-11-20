const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

export async function getProduits(){
  const res = await fetch(`${BASE}/produits`)
  if (!res.ok) throw new Error('Failed to fetch produits')
  return res.json()
}

export async function createProduit(data){
  const opts = { method: 'POST' }
  if (data instanceof FormData) {
    opts.body = data
  } else {
    opts.headers = {'Content-Type':'application/json'}
    opts.body = JSON.stringify(data)
  }
  const res = await fetch(`${BASE}/produits`, opts)
  if (!res.ok) throw new Error('Failed to create produit')
  return res.json()
}

export async function updateProduit(id, data){
  const opts = { method: 'PUT' }
  if (data instanceof FormData) {
    opts.body = data
  } else {
    opts.headers = {'Content-Type':'application/json'}
    opts.body = JSON.stringify(data)
  }
  const res = await fetch(`${BASE}/produits/${id}`, opts)
  if (!res.ok) throw new Error('Failed to update produit')
  return res.json()
}

export async function deleteProduit(id){
  const res = await fetch(`${BASE}/produits/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete produit')
  return res.json()
}

export default { getProduits, createProduit, updateProduit, deleteProduit }
