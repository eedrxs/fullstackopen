import { useQuery } from "@apollo/client"
import queries from "../../queries"
import { useEffect, useState } from "react"

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [genres, setGenres] = useState()
  const result = useQuery(queries.ALL_BOOKS, {
    skip: !props.show,
    variables: { genre: selectedGenre },
  })

  const books = result.data?.allBooks ?? []

  useEffect(() => {
    if (!genres && result.data) {
      const genres = Array.from(new Set(books.flatMap((book) => book.genres)))
      setGenres(genres)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres &&
          genres.map((genre) => {
            const isSelected = genre === selectedGenre

            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(isSelected ? null : genre)}
                style={{ outline: isSelected ? "2px solid cyan" : "none" }}
              >
                {genre}
              </button>
            )
          })}
      </div>
    </div>
  )
}

export default Books
