import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Notes from './pages/Notes'
import Login from './pages/Login'
import Note from './pages/Note'
import AddNotes from './pages/AddNotes'
import NotFound from './pages/NotFound'
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/add" element={<AddNotes />} />
        <Route path="notes/:id" element={<Note />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
