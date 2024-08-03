const Part = ({ name, amount }) => {
  return (
    <p>
      {name} {amount}
    </p>
  )
}
const Header = ({course}) => {

  console.log(course)
  return (
    <div>     

      <h1>{course}</h1>
      
    </div>
  )
}
const Content = ({parts}) => {

  
  return (
    <div>
      {parts.map(element => (
        <Part name={element.name} amount={element.exercises}/>
      ))}     
    
    </div>
  )
}

const Toatal = ({parts}) => {

  
  return (
    <div>
      <p>Number of exercises {parts[0].exercises+parts[1].exercises+parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  
  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Toatal parts={parts} />      
    </div>
  )
}

export default App