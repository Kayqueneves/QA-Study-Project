import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    general: ''
  })

  const [loading, setLoading] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    const newErrors = {
      name: '',
      email: '',
      password: '',
      general: ''
    }

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório.'
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

    const possuiErros =
      newErrors.name ||
      newErrors.email ||
      newErrors.password

    if (possuiErros) {
      return
    }

    setLoading(true)

    try {
      await register(name.trim(), email.trim(), password)
      navigate('/login')
    } catch (err) {
      setErrors({
        ...newErrors,
        general: err.message || 'Erro ao realizar cadastro.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h2>Cadastrar</h2>

      {errors.general && (
        <p className="error">{errors.general}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {errors.name && (
          <p className="error">{errors.name}</p>
        )}

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
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <p>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  )
}