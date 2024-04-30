import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { IoEyeOutline } from 'react-icons/io5'
import { IoEyeOffOutline } from 'react-icons/io5'

import config from '~/config'
import { useRouter } from '~/hooks'
import { supabase } from '~/config/supabase'
import './SignIn.css'

function SignIn() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const Icon = show ? IoEyeOffOutline : IoEyeOutline

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        throw new Error(error)
      }

      if (session) {
        router.replace(config.routes.home)
      }
    }

    checkUser()
  }, [router])

  const handleSignIn = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      return toast.error('Please enter your info!')
    }

    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      if (data.user) {
        toast.success('Login successfully!')
        router.replace(config.routes.home)
      }
    } catch (error) {
      toast.error(error.message)
      throw new Error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sign-in">
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            autoComplete="off"
            spellCheck="false"
            placeholder="Enter your email..."
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <span>
            <input
              id="password"
              type={show ? 'text' : 'password'}
              value={password}
              autoComplete="off"
              spellCheck="false"
              placeholder="Enter your password..."
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Icon
              size={20}
              className="show"
              onClick={() => setShow(!show)}
            />
          </span>
        </div>
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status"></span>
          ) : (
            <span>Sign In</span>
          )}
        </button>
        <p>
          Don&apos;t have an account?
          <Link to={config.routes.signUp}>Sign Up</Link>
        </p>
      </form>
    </div>
  )
}

export default SignIn
