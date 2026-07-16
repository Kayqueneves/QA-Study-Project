import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  })
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    const newErrors = {
      email: '',
      password: '',
      general: ''
    }

    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório.'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Informe um e-mail válido.'
      }
    }

    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória.'
    } else if (password.length < 6) {
      newErrors.password =
        'A senha precisa ter pelo menos 6 caracteres.'
    }

    setErrors(newErrors)

    const hasErrors =
      newErrors.email ||
      newErrors.password

    if (hasErrors) {
      return
    }

    setLoading(true)

    try {
      await login(email.trim(), password)
      navigate('/')
    } catch (err) {
      setErrors({
        email: '',
        password: '',
        general:
          err.message ||
          'Não foi possível entrar. Verifique suas credenciais.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h2>Entrar</h2>

      {errors.general && (
        <p className="error">{errors.general}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {errors.email && (
          <p className="error">{errors.email}</p>
        )}

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p>
        Não tem conta?{' '}
        <Link to="/register">Cadastre-se</Link>
      </p>
    </div>
  )
}