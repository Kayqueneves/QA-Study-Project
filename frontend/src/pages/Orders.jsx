import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/orders')
      .then(setOrders)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="container">Carregando pedidos...</div>

  return (
    <div className="container">
      <h2>Meus Pedidos</h2>
      {orders.length === 0 && <p>Voce ainda nao fez nenhum pedido.</p>}
      {orders.map((order) => (
        <div className="card" key={order.id} style={{ marginBottom: '1rem' }}>
          <h3>Pedido #{order.id}</h3>
          <p>Status: {order.status}</p>
          <p>Total: R$ {order.total.toFixed(2)}</p>
          <ul>
            {order.items.map((item) => (
              // CORRIGIDO: usa optional chaining e um texto alternativo caso o
              // produto tenha sido excluído do catálogo depois do pedido.
              <li key={item.id}>
                {item.product?.name ?? 'Produto removido do catalogo'} - qtd: {item.quantity} - R$ {item.unitPrice.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
