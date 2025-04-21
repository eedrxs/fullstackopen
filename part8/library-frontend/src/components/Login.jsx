import { useMutation } from "@apollo/client"
import queries from "../../queries"

const Login = ({ show, onToken }) => {
  const [login, result] = useMutation(queries.LOGIN, {
    onCompleted: (res) => {
      const token = res.login.value
      onToken(token)
      localStorage.setItem("UserToken", token)
    },
  })

  if (!show) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const username = e.target.name.value
    const password = e.target.password.value
    login({ variables: { username, password } })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name <input name="name" />
      </div>

      <div>
        pasword <input type="password" name="password" />
      </div>

      <button>{result.loading ? "loading..." : "login"} </button>
    </form>
  )
}

export default Login
