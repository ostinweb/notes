import React, { useState, useEffect } from 'react'
import { getJSON } from '../utils/utils'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const email = localStorage.getItem('email')
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    navigate('/register')
  }
  const [user, setUser] = useState(null)
  useEffect(() => {
    getJSON('users', `?email=${email}`).then((json) => setUser(json))
  }, [])

  const [id, setId] = useState(false)
  return (
    <div className="flex  justify-center w-full">
      <div className='w-1/3'>
      
        {user && <h1 className="text-3xl font-bold"> Hello {email}</h1>}
        {user && (
          <div className="text-blue-400 text-xs">
            <span>{user[0].createdAt}</span>
          </div>
        )}
        <div>
          <button
            className="bg-slate-400 py-2 rounded-md px-4 my-2 w-40"
            onClick={() => setId(true)}
          >
            go notes
          </button>
        </div>
        <div>
          <button
            className="bg-slate-400 py-2 rounded-md px-4 my-2 w-40"
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      </div>
      {id && <Navigate to="/notes" />}
    </div>
  )
}

export default Home
