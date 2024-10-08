import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
//import { useNotification } from './NotificationContext'
import notificationContext from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  //const { message ,showNotification } = useNotification()
  const [message ,showNotification] = useContext(notificationContext)
  //console.log('shownotification',showNotification)
  const updateAnecdoteMutation = useMutation( 
    {mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1 })    
    showNotification(`you voted '${anecdote.content}'`)
     
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],    
    queryFn: getAnecdotes
  })

  console.log(JSON.parse(JSON.stringify(result)))
  
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
