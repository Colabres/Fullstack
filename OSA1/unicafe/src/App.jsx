import { useState } from 'react'
const Display = ({text ,counter }) => <div>{text} {counter}</div>

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


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
        <h1>statistics</h1>
        <Display text="good" counter={good} />
        <Display text="neutral" counter={neutral} />
        <Display text="bad" counter={bad} />
      </div>
    </div>
  )
}

export default App