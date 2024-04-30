import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { IoEyeOutline } from 'react-icons/io5'
import { IoEyeOffOutline } from 'react-icons/io5'

import config from '~/config'
import { useRouter } from '~/hooks'
import { supabase } from '~/config/supabase'
import './SignUp.css'

function SignUp() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('Chu Văn Thơm')
  const [email, setEmail] = useState('vanthom2210@gmail.com')
  const [password, setPassword] = useState('123456')

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

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!fullName || !email || !password) {
      return toast.error('Please enter your info!')
    }

    try {
      setLoading(true)
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      })
      if (error) throw error

      if (user) {
        toast.success('Registration successful, please check your email and log in again!')
        router.push(config.routes.signIn)
      }
    } catch (error) {
      toast.error(error.message)
      throw new Error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sign-up">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="fullName">Name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            autoComplete="off"
            spellCheck="false"
            placeholder="Enter your name..."
            disabled={loading}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
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
          Already have an account?
          <Link to={config.routes.signIn}>Sign In</Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp
