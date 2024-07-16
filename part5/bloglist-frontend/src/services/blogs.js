import axios from 'axios'
import loginService from './login'
const baseUrl = '/api/blogs'

let token = null

const setUser = (user) => {
  token = `Bearer ${user.token}`
  localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
}

const getAll = () => {
  const config = {
    headers: { 'Authorization': token },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = (newBlog) => {
  const config = {
    headers: { 'Authorization': token },
  }
  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}

export default { getAll, create, setUser }