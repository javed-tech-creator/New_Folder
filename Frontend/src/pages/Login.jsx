
import { LoaderCircle, Mail, Lock } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

function Login() {
  const [user, setUser] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const backend_url = import.meta.env.VITE_BACKEND_URL

  const handleSubmit = async e => {
    e.preventDefault()
    let newErrors = { email: '', password: '' }

    if (!user.email.trim()) newErrors.email = 'Enter a valid email'
    if (!user.password.trim()) newErrors.password = 'Password required'

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(`${backend_url}/admin/login`, user, {
        withCredentials: true
      })

      localStorage.setItem("userData", JSON.stringify(res.data.admin))

      toast.success('Login successful')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-lg border border-gray-200">

        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Welcome Back
        </h2>

        <p className="text-center text-gray-600 text-sm mb-8">
          Sign in to access your dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">Email</div>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-2.5 text-gray-500" />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-neutral-800`}
              />
            </div>
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">Password</div>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-2.5 text-gray-500" />
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-neutral-800`}
              />
            </div>
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center h-11 bg-neutral-900 text-white rounded-lg text-md hover:bg-neutral-800 transition disabled:bg-gray-300"
          >
            {loading ? <LoaderCircle size={20} className="animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">No account? </span>
          <Link to="/signup" className="text-sm font-medium text-neutral-900 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
