import api from ".."

const getAnecdotes = async () => {
  const url = `/anecdotes`

  try {
    const res = await api.get(url)
    return res.data
  } catch (error) {
    throw error
  }
}

const addAnecdote = async (body) => {
  const url = `/anecdotes`

  try {
    const res = await api.post(url, body)
    return res.data
  } catch (error) {
    throw error
  }
}

const voteAnecdote = async (body) => {
  const {id, votes} = body
  const object = { votes: votes + 1 }
  const url = `/anecdotes/${id}`

  try {
    const res = await api.patch(url, object)
    return res.data
  } catch (error) {
    throw error
  }
}

export default { getAnecdotes, addAnecdote, voteAnecdote }
