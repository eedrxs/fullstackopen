const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const highestLikes = Math.max(...blogs.map(blog => blog.likes))
  const blogWithHighestLikes = blogs.find(blog => blog.likes === highestLikes)

  const { title, author, likes } = blogWithHighestLikes
  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  const authorsBlogs = {}
  let highestBlogQty = 0
  let result

  for (const blog of blogs) {
    if (authorsBlogs[blog.author]) {
      authorsBlogs[blog.author] += 1
    } else {
      authorsBlogs[blog.author] = 1
    }

    if (authorsBlogs[blog.author] >= highestBlogQty) {
      highestBlogQty = authorsBlogs[blog.author]
      result = { author: blog.author, blogs: highestBlogQty }
    }
  }

  return result
}

const mostLikes = (blogs) => {
  const authorsLikes = {}
  let highestLikes = 0
  let result

  for (const blog of blogs) {
    if (authorsLikes[blog.author]) {
      authorsLikes[blog.author] += blog.likes
    } else {
      authorsLikes[blog.author] = blog.likes
    }

    if (authorsLikes[blog.author] >= highestLikes) {
      highestLikes = authorsLikes[blog.author]
      result = { author: blog.author, likes: highestLikes }
    }
  }

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
