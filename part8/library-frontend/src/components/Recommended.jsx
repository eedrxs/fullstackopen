import { useQuery } from "@apollo/client"
import queries from "../../queries"

const Recommended = ({ show }) => {
  const userQuery = useQuery(queries.ME, { skip: !show })
  const booksQuery = useQuery(queries.ALL_BOOKS, {
    skip: !userQuery.data,
    variables: { genre: userQuery.data?.me?.favoriteGenre },
  })

  if (!show) {
    return null
  }

  if (userQuery.loading || booksQuery.loading) {
    return <div>loading...</div>
  }

  const books = booksQuery.data.allBooks ?? []

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{userQuery.data.me.favoriteGenre}</b>
      </p>

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
    </div>
  )
}

export default Recommended
