import { useState } from 'react'
const Display = ({text}) => <div>{text}</div>


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral
  const average = (good-bad)/all
  const positive = (good/all)

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

        <Display text={`good ${good}`} />
        <Display text={`neutral ${neutral}`} />
        <Display text={`bad ${bad}`} />
        <Display text={`all ${all}`} />
        <Display text={`average ${average.toFixed(2)}`} />
        <Display text={`positive ${positive.toFixed(2)} %`} />
      </div>
    </div>
  )
}

export default App