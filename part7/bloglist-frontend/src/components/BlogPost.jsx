import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import blogService from '../services/blogs'

const BlogPost = ({ likeBlog, addComment }) => {
    const [blog, setBlog] = useState()
    const [comment, setComment] = useState('')
    const { blogs } = useSelector((state) => state)
    const params = useParams()

    useEffect(() => {
        setBlog(() => blogs.find((blog) => blog.id === params.id))
    }, [blogs])

    return (
        blog && (
            <div>
                <h2 className="text-lg font-semibold">{blog.title}</h2>
                <a href={blog.url} className="text-blue-400 underline">
                    {blog.url}
                </a>
                <p>
                    {blog.likes} likes{' '}
                    <button
                        onClick={() => likeBlog(blog.id, blog.likes + 1)}
                        className="px-3 py-0.5 bg-green-600 text-white rounded-md"
                    >
                        like
                    </button>
                </p>
                <p>
                    added by <span className="font-medium">{blog.author}</span>
                </p>

                <h3 className="font-medium py-3">comments</h3>
                <div className="flex">
                    <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className='border border-blue-600'
                    />
                    <button
                        onClick={() => {
                            addComment(blog.id, comment)
                            setComment('')
                        }}
                        className='py-0.5 px-2 rounded-r-md bg-blue-600 text-white'
                    >
                        add comment
                    </button>
                </div>
                <ul>
                    {blog?.comments?.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
            </div>
        )
    )
}

export default BlogPost
