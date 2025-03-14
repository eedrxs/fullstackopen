import { useMutation, useQuery } from "@apollo/client"
import queries from "../../queries"
import { useState } from "react"

const Authors = (props) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")
  const result = useQuery(queries.ALL_AUTHORS, { skip: !props.show })

  const [updateAuthor, updateResult] = useMutation(queries.EDIT_AUTHOR, {
    refetchQueries: [{ query: queries.ALL_AUTHORS }],
    onCompleted: () => {
      setName("")
      setBorn("")
    },
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data?.allAuthors ?? []

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, setBornTo: born } })
    console.log("update author...")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          {/* <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.valueAsNumber)}
          />
        </div>
        <button type="submit">
          {updateResult.loading ? "updating..." : "update author"}
        </button>
      </form>
    </div>
  )
}

export default Authors
