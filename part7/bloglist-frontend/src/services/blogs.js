import axios from 'axios'
const baseUrl = '/api/blogs'

export let token = null

const setUser = (user) => {
    token = `Bearer ${user.token}`
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
}

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then((response) => response.data)
}

const create = (newBlog) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.post(baseUrl, newBlog, config)
    return request.then((response) => response.data)
}

const updateLikes = (blogId, likes) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.patch(`${baseUrl}/${blogId}`, { likes }, config)
    return request.then((response) => response.data)
}

const deleteBlog = (blogId) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.delete(`${baseUrl}/${blogId}`, config)
    return request.then((response) => response.data)
}

const addComment = (blogId, comment) => {
    const request = axios.post(`${baseUrl}/${blogId}/comments`, { comment })
    return request.then((response) => response.data)
}

export default { getAll, create, updateLikes, deleteBlog, setUser, addComment }
