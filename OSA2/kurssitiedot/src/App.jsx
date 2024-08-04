import Course from './components/Course'
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

      <h2>{course}</h2>
      
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
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  
  return (
    <div>
      <h3>total of {total} exercises </h3>
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

const Courses =({courses}) => {
  return (
    <div>
      <h1>Web development curriculum</h1>      
      {courses.map((course,i) => (     
        <div key={i}>           
        <Course course={course} />
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  
  return (
    <div>
    <Courses courses={courses} />
  </div>

  )
}

export default App