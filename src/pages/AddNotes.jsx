import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getJSON } from '../utils/utils'
export default function AddNotes() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const email = localStorage.getItem('email')
  const [id, setId] = useState(email)
  useEffect(() => {
    getJSON('users', `?email=${id}`).then((json) => setId(json))
  }, [])

  const [notes, setNotes] = useState([])
  const navigate = useNavigate()
  const today = new Date()
  const handleAddNotesServer = async () => {
    if (body.trim() !== '' && title.trim() !== '') {
      await fetch('http://localhost:3000/notes', {
        method: 'POST',
        body: JSON.stringify({
          userId: id[0].id,
          title: title,
          body: body,
          createdAt: today.toString(),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      getJSON('notes', `?userId=${id[0].id}`).then((json) => setNotes(json))
      setBody('')
      setTitle('')
      navigate('/notes')
    }
  }

  return (
    <div className="flex justify-center w-full">
      <div className="w-1/3">
        <div className="text-blue-600 underline text-3xl font-bold">
          <Link to="/notes">back</Link>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="focus:outline-none focus:shadow-outline w-full h-9 text-lg"
            placeholder="title"
          />
        </div>
        <div>
          <input
            className="focus:outline-none focus:shadow-outline w-full h-9 text-lg"
            placeholder="text"
            type="text"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </div>
        <div>
          <button
            className="bg-slate-400 py-2 rounded-md w-1/3 my-2"
            onClick={handleAddNotesServer}
          >
            add
          </button>
        </div>
      </div>
    </div>
  )
}
