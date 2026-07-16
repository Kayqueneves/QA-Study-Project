import { useEffect, useState } from 'react'
import { api } from '../api'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/products')
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="container">Carregando produtos...</div>

  return (
    <div className="container">
      <h2>Produtos</h2>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
