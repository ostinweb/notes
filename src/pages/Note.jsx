import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getJSON } from '../utils/utils'
export default function Note() {
  const { id } = useParams()
  const email = localStorage.getItem('email')

  const [note, setNote] = useState()
  const [user, setUser] = useState()
  useEffect(() => {
    if (email) {
      getJSON(`notes/${id}`).then((json) => setNote(json))
    }
  }, [])
  useEffect(() => {
    if (email) {
      getJSON(`notes/${id}`).then((json) => setNote(json))
    }
  }, [])
  return (
    <>
      {JSON.stringify(note) !== JSON.stringify({}) ? (
        note && (
          <div>
            <div className="text-blue-600 underline text-3xl font-bold">
              <Link to="/notes">Back</Link>
            </div>
            <div className='border w-1/3'>
              <h2 className="text-2xl font-bold">{note.title}</h2>
              <span className="text-lg">{note.body}</span>
            </div>
          </div>
        )
      ) : (
        <h1 className="text-3xl font-bold">ohh, no notes</h1>
      )}
    </>
  )
}
