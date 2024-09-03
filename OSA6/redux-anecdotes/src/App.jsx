import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Filter from './components/filter'
import Notification from './components/notification'
import anecdoteService from './services/anecdotes'
import {setData} from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(setData(anecdotes)))
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />

    </div>
  )
}

export default App



