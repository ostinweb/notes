import React, { useState, useRef, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { getJSON } from '../utils/utils'
const Register = () => {
  const email = useRef()
  const pass = useRef()
  const repeatPass = useRef()
  const [regUser, setRegUser] = useState(false)
  const [userState, setUserState] = useState(null)
  const handleSub = () => {
    if (
      email.current.value &&
      pass.current.value &&
      pass.current.value === repeatPass.current.value
    ) {
      localStorage.setItem('email', email.current.value)
      handleAddUserInServer()
      setRegUser(true)
    }
  }

  const [isLogged, setIsLogged] = useState(false)

  const today = new Date()
  const handleAddUserInServer = async () => {
    await fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify({
        email: email.current.value,
        password: pass.current.value,
        createdAt: today.toString(),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    await getJSON('users', `?email=${email?.current.value}`).then((json) =>
      setUserState(json)
    )
    console.log(userState)
  }
  useEffect(() => {
    if (localStorage.getItem('email')) {
      setIsLogged(true)
    }
  }, [])
  return (
    <>
      {isLogged ? (
        <h1 className="text-3xl font-bold my-3">you are Register</h1>
      ) : (
        <>
          <div className="flex justify-center w-full">
            <div className="w-1/3">
              <div>
                <h1 className="text-3xl font-bold my-3">Register</h1>
              </div>
              <div>
                <input
                  type="text"
                  ref={email}
                  className="focus:outline-none focus:shadow-outline w-full h-9 text-lg"
                  placeholder="name"
                />
              </div>
              <div>
                <input
                  type="password"
                  ref={pass}
                  className="focus:outline-none focus:shadow-outline w-full h-9 text-lg"
                  placeholder="password"
                />
              </div>
              <div>
                <input
                  type="password"
                  ref={repeatPass}
                  className="focus:outline-none focus:shadow-outline w-full h-9 text-lg"
                  placeholder="repeat password"
                />
              </div>
              <div>
                <button
                  className="bg-slate-400 py-2 rounded-md w-1/3 my-2"
                  onClick={handleSub}
                >
                  Регестрация
                </button>
              </div>
              <div className="text-xs text-blue-400">
                <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
          {userState && <Navigate to="/" state={userState} />}
        </>
      )}
    </>
  )
}

export default Register
