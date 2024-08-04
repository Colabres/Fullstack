import { useState } from 'react'
const StatisticLine = ({text} ) =>  <div>{text}</div>

const getRandomInt = (max) => Math.floor(Math.random() * max)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(7).fill(0))

  const handleSelected = () => {    
    setSelected(getRandomInt(7))
  }
  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const maxVotes = Math.max(...points)
  const maxVotesIndex = points.indexOf(maxVotes)

  return (
    <div>
      <h1> Anecdote of the day </h1>
      <StatisticLine text={anecdotes[selected]}/>
      <StatisticLine text={`has ${points[selected]} votes`}/>
      <Button handleClick={handleVote} text={"vote"} />
      <Button handleClick={handleSelected} text={"next anecdote"} />
      <h1> Anecdote with most votes </h1>
      <StatisticLine text={anecdotes[maxVotesIndex]}/>
      <StatisticLine text={`has ${maxVotes} votes`}/>

    </div>
  )
}

export default App