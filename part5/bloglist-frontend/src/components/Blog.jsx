import { useState } from "react"

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [showDetail, setShowDetail] = useState(false)

  const toggleVisibility = () => setShowDetail(!showDetail)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>
          {showDetail ? "hide" : "view"}
        </button>
      </div>

      {showDetail && (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div className="likes">
            likes {blog.likes}{" "}
            <button onClick={() => likeBlog(blog.id, blog.likes + 1)}>
              like
            </button>
          </div>
          <div className="username">{blog.user.username}</div>
          {user.username === blog.user.username && (
            <button onClick={() => deleteBlog(blog)}>delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
