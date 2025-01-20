import axios from 'axios'
import { token } from './blogs'
const baseUrl = '/api/users'

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then((response) => response.data)
}

export default { getAll }
