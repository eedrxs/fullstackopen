import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { Link, Route, Routes } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import BlogPost from './components/BlogPost'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { notification, blogs, user } = useSelector((state) => ({
        blogs: [...state.blogs].sort((a, b) => b.likes - a.likes),
        ...state,
    }))
    const dispatch = useDispatch()

    useEffect(() => {
        user && dispatch(initializeBlogs())
    }, [user])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setUser(user)
            dispatch(setUser(user))
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })

            blogService.setUser(user)
            dispatch(setUser(user))
            setUsername('')
            setPassword('')
        } catch (err) {
            console.log(err)
            showNotification(err.response.data.error, 'error')
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch(setUser(null))
    }

    const handleCreateBlog = async (blogObj) => {
        try {
            const blog = await blogService.create(blogObj)

            dispatch(initializeBlogs())
            showNotification(
                `a new blog ${blog.title} by ${blog.author} added`,
                'success'
            )
        } catch (err) {
            showNotification('Blog creation failed', 'error')
        }
    }

    const handleLikeBlog = async (blogId, likes) => {
        try {
            await blogService.updateLikes(blogId, likes)
            dispatch(initializeBlogs())
        } catch (error) {
            showNotification('Failed to like blog', 'error')
        }
    }

    const handleDeleteBlog = async (blog) => {
        if (!window.confirm(`Delete blog ${blog.title} by ${blog.author}?`))
            return

        try {
            await blogService.deleteBlog(blog.id)
            dispatch(initializeBlogs())
        } catch (error) {
            showNotification('Failed to delete blog', 'error')
        }
    }

    const handleAddComment = async (blogId, comment) => {
        try {
            await blogService.addComment(blogId, comment)
            dispatch(initializeBlogs())
            showNotification(`new comment added`, 'success')
        } catch (error) {
            showNotification('Failed to add comment', 'error')
        }
    }

    const showNotification = (message, type) => {
        dispatch(setNotification({ message, type }))
        setTimeout(() => {
            dispatch(setNotification(null))
        }, 5000)
    }

    const loginForm = () => (
        <form aria-label="login form">
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

    const home = () => (
        <>
            <Togglable buttonLabel="new note">
                <BlogForm createBlog={handleCreateBlog} />
            </Togglable>

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </>
    )

    if (!user) return loginForm()

    return (
        <div>
            <Notification notification={notification} />
            <p className="flex items-center gap-2 px-4 py-2 bg-green-300">
                <Link to={'/'} className="underline">
                    blogs
                </Link>
                <Link to={'/users'} className="underline">
                    users
                </Link>
                <span className="ml-auto">{user.name} is logged in</span>
                <button
                    onClick={handleLogout}
                    className="bg-green-800 text-white py-1 px-3 rounded-md"
                >
                    logout
                </button>
            </p>

            <div className="px-4">
                <h2 className="text-xl font-bold mb-5">blog app</h2>
                <Routes>
                    <Route
                        path="/blogs/:id"
                        element={
                            <BlogPost
                                likeBlog={handleLikeBlog}
                                addComment={handleAddComment}
                            />
                        }
                    />
                    <Route path="/users/:id" element={<User />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/" element={home()} />
                </Routes>
            </div>
        </div>
    )
}

export default App
