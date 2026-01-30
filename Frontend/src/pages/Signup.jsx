
import { LoaderCircle, Lock, Mail, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  const [user, setUser] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = e => {
    e.preventDefault()
    let newErrors = { name: '', email: '', password: '' }

    if (!user.name.trim()) newErrors.name = 'Enter your name'
    if (!user.email.trim()) newErrors.email = 'Enter a valid email'
    if (!user.password.trim()) newErrors.password = 'Password required'

    if (newErrors.name || newErrors.email || newErrors.password) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('Signup successful')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-lg border border-gray-200">

        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Create Account
        </h2>

        <p className="text-center text-gray-600 text-sm mb-8">
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">Full Name</div>
            <div className="relative">
              <UserRound size={20} className="absolute left-3 top-2.5 text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={user.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-neutral-800`} 
              />
            </div>
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">Email</div>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-2.5 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={user.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
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
                placeholder="Enter password"
                value={user.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-neutral-800`} 
              />
            </div>
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center h-11 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition disabled:bg-gray-300"
          >
            {loading ? <LoaderCircle size={20} className="animate-spin" /> : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">Already a user? </span>
          <Link to="/" className="text-sm font-medium text-neutral-900 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
