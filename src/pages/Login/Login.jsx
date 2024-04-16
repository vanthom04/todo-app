import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { FaRegEye } from 'react-icons/fa'
import { FaRegEyeSlash } from 'react-icons/fa'

import { checkEmail } from '~/utils/constants'
import { supabase } from '~/config/supabase'
import './Login.css'

function Login() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const Icon = show ? FaRegEye : FaRegEyeSlash

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      return toast.error('Please enter your info!')
    }
    if (!checkEmail(email)) {
      return toast.error('Please enter correct email!')
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      console.log(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            autoComplete="off"
            spellCheck="false"
            placeholder="Enter your email..."
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <Icon
              size={20}
              className="show"
              onClick={() => setShow(!show)}
            />
          </span>
        </div>
        <button type="submit">
          Login
        </button>
        <p>Already have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  )
}

export default Login
