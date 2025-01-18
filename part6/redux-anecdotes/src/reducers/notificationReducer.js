import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notitication",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ""
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const notify = (message, duration = 5) => async (dispatch) => {
  dispatch(setNotification(message))
  setTimeout(() => dispatch(clearNotification()), duration * 1000)
}
