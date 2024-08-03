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
const Content = ({content}) => {

  console.log(content)
  return (
    <div>     
      <Part name={content[0].name} amount={content[0].amount} />
      <Part name={content[1].name} amount={content[1].amount} />
      <Part name={content[2].name} amount={content[2].amount} />      
    </div>
  )
}

const Toatal = ({total}) => {

  console.log(total)
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { name : 'Fundamentals of React',amount : 10},
    { name : 'Using props to pass data',amount : 7},
    { name : 'State of a component',amount : 14}
  ]
  const total = parts[0].amount+parts[1].amount+parts[2].amount
  return (
    <div>
      <Header course={course} />
      <Content content={parts} />
      <Toatal total={total} />      
    </div>
  )
}

export default App