import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="text-3xl font-bold">
      <h1>404</h1>
      <div className="text-blue-400 underline">
        <Link to="/">go home</Link>
      </div>
    </div>
  )
}
