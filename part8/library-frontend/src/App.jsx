import { useEffect, useState } from "react"
import { gql, useSubscription } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Recommended from "./components/Recommended"
import Login from "./components/Login"
import queries from "../queries"

const App = () => {
  const [token, setToken] = useState()
  const [page, setPage] = useState("authors")

  useSubscription(queries.BOOK_ADDED, {
    onData: ({ data: { data }, client }) => {
      const { bookAdded } = data
      alert(`New book '${bookAdded.title}' by '${bookAdded.author.name}'`)

      client.cache.modify({
        fields: {
          allBooks: (existingBooks = []) => {
            const newBookRef = client.cache.writeFragment({
              data: bookAdded,
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

  useEffect(() => {
    const token = localStorage.getItem("UserToken")
    setToken(token)
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.removeItem("UserToken")
  }

  const handleLogin = (token) => {
    setToken(token)
    setPage("books")
  }

  const menuBtn = (value) => {
    return {
      onClick: () => setPage(value),
      style: { outline: page === value ? "2px solid cyan" : "none" },
    }
  }

  return (
    <div>
      <div>
        <button {...menuBtn("authors")}>authors</button>
        <button {...menuBtn("books")}>books</button>
        {token ? (
          <>
            <button {...menuBtn("recommended")}>recommended</button>
            <button {...menuBtn("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button {...menuBtn("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommended show={page === "recommended"} />

      <Login show={page === "login"} onToken={handleLogin} />
    </div>
  )
}

export default App
