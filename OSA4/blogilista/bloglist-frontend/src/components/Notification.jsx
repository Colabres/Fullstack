export const NotificationError = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

export const NotificationStatus = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="status">
        {message}
      </div>
    )
  }
  
 // export default notification_error,notification_status 