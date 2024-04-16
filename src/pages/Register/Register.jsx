import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { FaRegEye } from 'react-icons/fa'
import { FaRegEyeSlash } from 'react-icons/fa'

import { checkEmail } from '~/utils/constants'
import { supabase } from '~/config/supabase'
import './Register.css'

function Register() {
  const [show, setShow] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const Icon = show ? FaRegEye : FaRegEyeSlash

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    if (!fullName || !email || !password) {
      return toast.error('Please enter your info!')
    }
    if (!checkEmail(email)) {
      return toast.error('Please enter correct email!')
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (error) throw error

      console.log(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleRegisterSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            autoComplete="off"
            spellCheck="false"
            placeholder="Enter your name..."
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
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
        <p>Don&apos;t have an account? <Link to="/login">Register</Link></p>
      </form>
    </div>
  )
}

export default Register
