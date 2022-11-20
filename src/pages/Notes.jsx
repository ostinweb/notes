import { getJSON } from '../utils/utils'
import { useEffect, useState } from 'react'

import { Navigate, Link } from 'react-router-dom'

export default function Notes() {
  const [notes, setNotes] = useState()
  const email = localStorage.getItem('email')
  const [id, setId] = useState(email)
  useEffect(() => {
    getJSON('users', `?email=${id}`).then((json) => setId(json))
  }, [])

  useEffect(() => {
    getJSON('notes', `?userId=${id[0].id}`).then((json) => setNotes(json))
  }, [notes])

  const [page, setPage] = useState(false)
  const handlePage = () => {
    setPage(true)
  }

  return (
    <>
      <div>
        <div>
          <div className="text-blue-600 underline text-3xl font-bold">
            <Link to="/">Back</Link>
          </div>
          <button
            onClick={handlePage}
            className="bg-slate-400 py-2 rounded-md w-1/3 my-2"
          >
            go notes
          </button>
          {notes &&
            id &&
            notes.map((note) => (
              <div key={note.id} className="text-2xl font-bold text-blue-300">
                <Link to={`/notes/${note.id}`}>{note.title}</Link>
              </div>
            ))}
        </div>
      </div>
      {page && <Navigate to="/add" />}
    </>
  )
}
