import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = async (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url,
    })

    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      {/* title */}
      <div>
        <label>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>

      {/* author */}
      <div>
        <label>
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>

      {/* url */}
      <div>
        <label>
          url:
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </label>
      </div>

      {/* create button */}
      <button type="submit">
        create
      </button>
    </form>
  )
}

export default BlogForm
