import { createContext, useReducer,useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
        return action.payload
    case "HIDE":
        return ''
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationProvider = (props) => {
  const [message, notificationDispatch] = useReducer(notificationReducer, '')

  const showNotification = (text, duration = 5) => {
    console.log('working with ',text)
    notificationDispatch({ type: 'SET', payload: text });
    setTimeout(() => notificationDispatch({ type: 'HIDE' }), duration * 1000);
  }

  return (
    <NotificationContext.Provider value={[message, showNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)

export default NotificationContext









