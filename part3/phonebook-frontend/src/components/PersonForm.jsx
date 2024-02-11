const PersonForm = ({
  newName,
  newNumber,
  onNewName,
  onNewNumber,
  onAddPerson,
}) => {
  return (
    <form onSubmit={onAddPerson}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => onNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => onNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
