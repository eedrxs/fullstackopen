const App = () => {
  const course = "Half Stack application development"
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content
        p1={part1}
        e1={exercises1}
        p2={part2}
        e2={exercises2}
        p3={part3}
        e3={exercises3}
      />
      <Total number={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App

const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Content = ({ p1, e1, p2, e2, p3, e3 }) => {
  return (
    <div>
      <Part part={p1} exercise={e1} />
      <Part part={p2} exercise={e2} />
      <Part part={p3} exercise={e3} />
    </div>
  )
}

const Total = ({ number }) => {
  return <p>Number of exercises {number}</p>
}

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  )
}