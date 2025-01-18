import { useSelector, useDispatch } from "react-redux"
import { incrementAnecdoteVotes, setAnecdotes, voteAnecdote } from "../reducers/anecdoteReducer"
import {
  clearNotification,
  notify,
  setNotification,
} from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes
      .filter((anecdote) => anecdote.content.match(new RegExp(filter, "i")))
      .sort((a, b) => b.votes - a.votes)
  )

  const vote = (anecdote) => {
    dispatch(incrementAnecdoteVotes(anecdote))
    dispatch(notify(`you voted '${anecdote.content}'`, 3))
  }

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ))
}

export default AnecdoteList
