import { useState } from 'react'
const StatisticLine = ({text} ) =>  <div>{text}</div>

const getRandomInt = (max) => Math.floor(Math.random() * max)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0){
    return (
      <h3>
        No feedback given
      </h3>
    )

  } 

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
      <StatisticLine text={`good`} value= {good} />
      <StatisticLine text={`neutral`} value={neutral} />
      <StatisticLine text={`bad`} value={bad} />
      <StatisticLine text={`all`} value={all} />
      <StatisticLine text={`average`}  value={average.toFixed(2)} />
      <StatisticLine text={`positive`} value={`${positive.toFixed(2)} %`} />
        </tbody>
      </table>
    </div>
  )

}

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
  const handleSelected = () => {    
    setSelected(getRandomInt(7))
  }
  return (
    <div>
      <StatisticLine text={anecdotes[selected]}/>
      <Button handleClick={handleSelected} text={"next pls"} />
    </div>
  )
}

export default App