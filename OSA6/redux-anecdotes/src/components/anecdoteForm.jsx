import { useDispatch } from 'react-redux'
//import { createAnecdote } from '../reducers/anecdoteReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`you added "${content}"`))
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000)

  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
    
  )
}

export default NewAnecdote