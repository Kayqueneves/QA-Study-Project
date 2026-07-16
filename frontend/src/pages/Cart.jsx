import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cartItems, fetchCart, updateQuantity, removeItem, checkout } = useCart()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [checkingOut, setCheckingOut] = useState(false)

  useEffect(() => {
    fetchCart()
  }, [])

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
    0
  )

  // CORRIGIDO: valida a quantidade no front antes de chamar a API (não deixa
  // enviar zero, negativo ou algo que não seja um número inteiro).
  async function handleQuantityChange(itemId, value) {
    setError('')
    const quantity = Number(value)

    if (!Number.isInteger(quantity) || quantity <= 0) {
      setError('A quantidade precisa ser um número inteiro maior que zero.')
      return
    }

    try {
      await updateQuantity(itemId, quantity)
    } catch (err) {
      setError(err.message)
    }
  }

  // CORRIGIDO: usa um estado de "carregando" e desabilita o botão durante a
  // chamada, evitando que um clique duplo crie dois pedidos.
  async function handleCheckout() {
    if (checkingOut) return
    setError('')
    setCheckingOut(true)
    try {
      const order = await checkout()
      setMessage(`Pedido #${order.id} criado com sucesso!`)
      navigate('/orders')
    } catch (err) {
      setError(err.message)
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <div className="container">
      <h2>Carrinho</h2>
      {message && <p>{message}</p>}
      {error && <p className="error">{error}</p>}
      {cartItems.length === 0 ? (
        <p>Seu carrinho esta vazio.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preco</th>
              <th>Quantidade</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.product?.name}</td>
                <td>R$ {item.product?.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    defaultValue={item.quantity}
                    onBlur={(e) => handleQuantityChange(item.id, e.target.value)}
                    style={{ width: '70px' }}
                  />
                </td>
                <td>R$ {((item.product?.price ?? 0) * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeItem(item.id)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3>Total: R$ {total.toFixed(2)}</h3>
      <button onClick={handleCheckout} disabled={cartItems.length === 0 || checkingOut}>
        {checkingOut ? 'Finalizando...' : 'Finalizar Pedido'}
      </button>
    </div>
  )
}
