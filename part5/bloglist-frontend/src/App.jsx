import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    user && getBlogs()
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setUser(user)
      setUser(user)
    }
  }, [])

  const getBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setUser(user)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (err) {
      console.log(err)
      showNotification(err.response.data.error, "error")
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    setUser(null)
  }

  const handleCreateBlog = async (blogObj) => {
    try {
      const blog = await blogService.create(blogObj)

      getBlogs()
      showNotification(
        `a new blog ${blog.title} by ${blog.author} added`,
        "success"
      )
    } catch (err) {
      showNotification("Blog creation failed", "error")
    }
  }

  const handleLikeBlog = async (blogId, likes) => {
    try {
      await blogService.updateLikes(blogId, likes)
      getBlogs()
    } catch (error) {
      showNotification("Failed to like blog", "error")
    }
  }

  const handleDeleteBlog = async (blog) => {
    if (!window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) return
    
    try {
      await blogService.deleteBlog(blog.id)
      getBlogs()
    } catch (error) {
      showNotification("Failed to delete blog", "error")
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const loginForm = () => (
    <form>
      <h2>login</h2>

      <Notification notification={notification} />

      <div>
        <label>
          username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit" onClick={handleLogin}>
        login
      </button>
    </form>
  )
  if (!user) return loginForm()

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <p>
        {user.name} is logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="new note">
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} likeBlog={handleLikeBlog} deleteBlog={handleDeleteBlog} />
        ))}
    </div>
  )
}

export default App
