import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotification } from "../contexts/NotificationProvider"
import _anecdote from "../../api/_anecdote"
import axios from "axios"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useNotification()

  const mutation = useMutation({
    mutationFn: _anecdote.addAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
      notificationDispatch({
        type: "SET",
        payload: `you created: '${newAnecdote.content}'`,
      })
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        notificationDispatch({ type: "SET", payload: err.response.data.error })
      }
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    mutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
