import React, { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { getJSON } from '../utils/utils'
const Login = () => {
  const [userLogin, setUserLogin] = useState()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleSetEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleSetPass = (e) => {
    setPass(e.target.value)
  }
  const [nav, setNav] = useState(false)
  useEffect(() => {
    getJSON('users', `?email=${email}`).then((json) => setUserLogin(json))
  }, [email])

  const handleLogin = () => {
    if (email && pass) {
      const [descrUserLogin] = userLogin
      if (
        descrUserLogin?.email === email &&
        descrUserLogin?.password === pass
      ) {
        localStorage.setItem('email', email)
        setNav(true)
      } else {
        alert('no user')
      }
    }
  }
  return (
    <div className="flex justify-center">
      <div className="w-1/3">
        <div>
          <h1 className="text-3xl font-bold my-3">Login</h1>
        </div>
        <div>
          <input
            className="focus:outline-none focus:shadow-outline w-full h-9 text-lg"
            placeholder="name"
            type="text"
            onChange={(e) => handleSetEmail(e)}
          />
        </div>
        <div>
          <input
            className="focus:outline-none focus:shadow-outline w-full h-9 text-lg"
            type="password"
            placeholder="password"
            onChange={(e) => handleSetPass(e)}
          />
        </div>
        <div>
          <button className="bg-slate-400 py-2 rounded-md w-1/3 my-2" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className='text-blue-400 text-xs'>
          <Link to="/register">Register</Link>
        </div>
      </div>
      {nav && <Navigate to="/" state={userLogin} />}
    </div>
  )
}

export default Login
