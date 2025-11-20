const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

export async function fetchProduits(){
  const res = await fetch(`${BASE}/produits`)
  if (!res.ok) throw new Error('Failed to fetch produits')
  return res.json()
}

export default { fetchProduits }
