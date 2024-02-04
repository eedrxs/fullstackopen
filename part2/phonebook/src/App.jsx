import { useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterText, setFilterText] = useState("")

  const addPerson = (e) => {
    e.preventDefault()

    const nameExists = persons.some(({ name }) => name === newName)
    if (nameExists) {
      alert(`${newName} already exists in phonebook`)
    } else {
      setPersons([...persons, { name: newName, number: newNumber }])
      setNewName("")
      setNewNumber("")
    }
  }

  const filteredPersons = persons.filter(({ name }) =>
    new RegExp(filterText, "i").test(name)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterText} onChange={setFilterText} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNewName={setNewName}
        onNewNumber={setNewNumber}
        onAddPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
