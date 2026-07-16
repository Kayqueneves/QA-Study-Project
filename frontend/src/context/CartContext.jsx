import { createContext, useContext, useState } from 'react'
import { api } from '../api'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  async function fetchCart() {
    const data = await api.get('/cart')
    setCartItems(data)
  }

  async function addToCart(productId, quantity) {
    await api.post('/cart', { productId, quantity })
    await fetchCart()
  }

  async function updateQuantity(itemId, quantity) {
    await api.put(`/cart/${itemId}`, { quantity })
    await fetchCart()
  }

  async function removeItem(itemId) {
    await api.delete(`/cart/${itemId}`)
    await fetchCart()
  }

  async function checkout() {
    const order = await api.post('/cart/checkout', {})
    return order
  }

  // CORRIGIDO: o badge agora soma a quantidade de cada item, em vez de
  // contar apenas o número de linhas (produtos distintos) do carrinho.
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, fetchCart, addToCart, updateQuantity, removeItem, checkout }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
