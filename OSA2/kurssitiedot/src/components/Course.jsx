const Content = ({parts}) => {

  
    return (
      <div>
        {parts.map((element,i) => (
          <Part key={i} name={element.name} amount={element.exercises}/>
        ))}     
      
      </div>
    )
  }
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

const Total = ({parts}) => {
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
      <Total parts={course.parts} />      
    </div>
    )
  }

  export default Course