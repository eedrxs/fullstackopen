import { useState, useEffect } from 'react'
import userService from '../services/user'
import { Link, useParams } from 'react-router-dom'

const User = () => {
    const [user, setUser] = useState()
    const params = useParams()
    
    useEffect(() => {
        userService
            .getAll()
            .then((users) =>
                setUser(() => users.find((user) => user.id === params.id))
            )
    }, [])

    return (
        user && (
            <div>
                <h2 className='font-semibold text-lg mb-2'>{user.name}</h2>
                <h3 className='font-semibold text-xl'>added blogs</h3>
                <ul>
                    {user.blogs.map((blog) => (
                        <li key={blog.id}>{blog.title}</li>
                    ))}
                </ul>
            </div>
        )
    )
}

export default User
