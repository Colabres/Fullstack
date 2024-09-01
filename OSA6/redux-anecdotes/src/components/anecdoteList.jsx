import { useDispatch, useSelector } from 'react-redux'
import { like } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote , handleClick }) => {
  return(
    <div>
      <div> 
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>       
    </div>

  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({filter, anecdotes}) => {
    return filter === '' ? anecdotes : anecdotes.filter(a => a.content.includes(filter))
})
const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return(    
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            dispatch(like(anecdote.id))
          }
        />
      )}
    </div>
  )
}

export default Anecdotes
