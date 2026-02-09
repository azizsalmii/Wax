const API_ORIGIN = import.meta.env.VITE_API_BASE || `${API_ORIGIN}`;

const BASE = `${API_ORIGIN}/api`;

// Produits
export async function fetchProduits() {
  const res = await fetch(`${BASE}/produits`);
  if (!res.ok) throw new Error("Failed to fetch produits");
  return res.json();
}

export default { fetchProduits };
