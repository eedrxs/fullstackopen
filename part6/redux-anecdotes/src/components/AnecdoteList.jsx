import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes
      .filter((anecdote) => anecdote.content.match(new RegExp(filter, "i")))
      .sort((a, b) => b.votes - a.votes)
  )

  const vote = (id) => {
    console.log("vote", id)
    dispatch(voteAnecdote(id))
  }

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ))
}

export default AnecdoteList
