import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  
  // Charger depuis localStorage au démarrage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("wax_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Sauvegarder dès que le panier change
  useEffect(() => {
    localStorage.setItem("wax_cart", JSON.stringify(cart));
  }, [cart]);

  // Ajouter au panier
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  // Supprimer par index
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Total dynamique
  const total = cart.reduce((sum, p) => sum + Number(p.prix * p.quantite), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
