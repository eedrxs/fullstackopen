import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import _anecdote from "../api/_anecdote"

const App = () => {
  const queryClient = useQueryClient()

  const handleVote = (anecdote) => {
    mutation.mutate(anecdote)
  }

  const query = useQuery({
    queryKey: ["anecdotes"],
    queryFn: _anecdote.getAnecdotes,
    retry: false,
  })

  const mutation = useMutation({
    mutationFn: _anecdote.voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      const updatedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
      queryClient.setQueryData(["anecdotes"], updatedAnecdotes)
    },
  })

  const anecdotes = [
    {
      content: "If it hurts, do it more often",
      id: "47145",
      votes: 0,
    },
  ]

  if (query.isError)
    return "anecdote service not available due to problems in server"

  if (query.isLoading) return "loading..."

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {(query.data || []).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
