import { useEffect, useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Recommended from "./components/Recommended"
import Login from "./components/Login"

const App = () => {
  const [token, setToken] = useState()
  const [page, setPage] = useState("authors")

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
