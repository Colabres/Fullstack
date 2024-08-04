import { useState } from 'react'
const StatisticLine = ({text,value} ) =>   <tr><td>{text}</td><td>{value}</td></tr>


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
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral
  const average = all > 0 ? (good-bad)/all : 0
  const positive = all > 0 ? (good/all) : 0

  const handleGood = () => {    
    setGood(good + 1)
  }
  const handleNeutral = () => {    
    setNeutral(neutral + 1)
  }
  const handleBad = () => {    
    setBad(bad + 1)
  }


  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={handleGood} text='Good' />
        <Button handleClick={handleNeutral} text='Neutral' />
        <Button handleClick={handleBad} text='Bad' />        
        <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />

      </div>
    </div>
  )
}

export default App