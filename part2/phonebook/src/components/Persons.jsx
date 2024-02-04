const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(({ name, number }) => (
        <p key={name}>
          {name} {number}
        </p>
      ))}
    </div>
  )
}

export default Persons
