const PORT = 3000
export async function getJSON(
  route = '',
  param = '',
  site = `http://localhost:${PORT}/`
) {
  const response = await fetch(site + route + param)
  const posts = await response.json()
  return posts
}
