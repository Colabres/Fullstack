import { useDispatch } from 'react-redux'
//import { createAnecdote } from '../reducers/anecdoteReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
//import anecdoteServises from '../services/anecdotes'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    // const newAn = await anecdoteServises.createNew(content)
    // dispatch(createAnecdote(newAn))
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