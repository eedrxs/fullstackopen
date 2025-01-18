import { createContext, useContext, useEffect, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "REMOVE":
      return ""
    default:
      return state
  }
}

const NotificationContext = createContext()

const NotificationProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  )

  useEffect(() => {
    if (notification) {
      setTimeout(() => notificationDispatch({ type: "REMOVE" }), 3000)
    }
  }, [notification])

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
export const useNotification = () => useContext(NotificationContext)
