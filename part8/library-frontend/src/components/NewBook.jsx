import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import queries from "../../queries"

const NewBook = (props) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [published, setPublished] = useState("")
  const [genre, setGenre] = useState("")
  const [genres, setGenres] = useState([])
  const [addBook, result] = useMutation(queries.ADD_BOOK, {
    onCompleted: () => {
      setTitle("")
      setPublished("")
      setAuthor("")
      setGenres([])
      setGenre("")
    },
    update: (cache, { data: { addBook } }) => {
      cache.modify({
        fields: {
          allBooks: (existingBooks = []) => {
            const newBookRef = cache.writeFragment({
              data: addBook,
              fragment: gql`
                fragment NewBook on Book {
                  id
                  title
                  published
                  genres
                  author {
                    name
                  }
                }
              `,
            })

            return [...existingBooks, newBookRef]
          },
        },
      })
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    addBook({ variables: { title, author, published, genres } })
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre("")
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.valueAsNumber)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">
          {result.loading ? "creating..." : "create book"}
        </button>
      </form>
    </div>
  )
}

export default NewBook
