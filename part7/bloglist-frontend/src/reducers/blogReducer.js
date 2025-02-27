import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
    },
})

export const { setBlogs } = blogSlice.actions
export default blogSlice.reducer

export const initializeBlogs = () => async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
}
