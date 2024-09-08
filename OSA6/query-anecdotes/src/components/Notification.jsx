import notificationContext from '../NotificationContext'
import { useContext } from 'react'

const Notification = () => {
  const [message ,showNotification] = useContext(notificationContext)
  
  console.log('notification message recived ',message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: message ? 'block' : 'none'
  }  

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
