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
      {parts.map((element,i) => (
        <Part key={i} name={element.name} amount={element.exercises}/>
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

const Course =({course}) => {
  return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts}/>
    <Toatal parts={course.parts} />      
  </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  
  return (
    <div>
    <Course course={course} />
  </div>

  )
}

export default App