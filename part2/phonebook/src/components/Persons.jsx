const Persons = ({ persons, onDeletePerson }) => {
  return (
    <div>
      {persons.map(({ id, name, number }) => (
        <p key={id}>
          {name} {number}{" "}
          <button onClick={() => onDeletePerson(id, name)}>delete</button>
        </p>
      ))}
    </div>
  )
}

export default Persons
