import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Produtos</Link>
        {user && <Link to="/cart">Carrinho <span className="badge">{cartCount}</span></Link>}
        {user && <Link to="/orders">Meus Pedidos</Link>}
      </div>
      <div className="links">
        {user ? (
          <>
            <span style={{ marginRight: '1rem' }}>Ola, {user.name}</span>
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login">Entrar</Link>
            <Link to="/register">Cadastrar</Link>
          </>
        )}
      </div>
    </div>
  )
}
