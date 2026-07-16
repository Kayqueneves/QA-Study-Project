import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  // CORRIGIDO: agora trata o erro que a API pode devolver (ex: quantidade
  // invalida ou estoque insuficiente, validado no backend) e mostra pro
  // usuario, em vez de deixar a Promise rejeitar silenciosamente.
  async function handleAdd() {
    setError('')
    const qty = Number(quantity)

    if (!Number.isInteger(qty) || qty <= 0) {
      setError('Informe uma quantidade valida.')
      return
    }

    setAdding(true)
    try {
      await addToCart(product.id, qty)
    } catch (err) {
      setError(err.message)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><strong>R$ {product.price.toFixed(2)}</strong></p>
      <p>Estoque: {product.stock}</p>
      {error && <p className="error">{error}</p>}
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
        style={{ width: '80px', display: 'inline-block', marginRight: '0.5rem' }}
      />
      <button onClick={handleAdd} disabled={adding}>
        {adding ? 'Adicionando...' : 'Adicionar ao carrinho'}
      </button>
    </div>
  )
}
