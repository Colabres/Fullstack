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

      <p>{content[0].name} {content[0].amount}</p>
      <p>{content[1].name} {content[1].amount}</p>
      <p>{content[2].name} {content[2].amount}</p>
      
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