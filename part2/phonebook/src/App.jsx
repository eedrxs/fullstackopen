import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"

import personService from "./services/person"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterText, setFilterText] = useState("")
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const existingPerson = persons.find(({ name }) => name === newName)

    if (existingPerson) {
      const wantsToEdit = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (wantsToEdit) {
        personService
          .update(existingPerson.id, newPerson)
          .then(() => {
            showNotification(`Updated ${newName}`, "success")
            personService.getAll().then((persons) => {
              setPersons(persons)
              clearInputs()
            })
          })
          .catch((err) => {
            if (err.response.status === 404) {
              showNotification(
                `Information of ${newName} has already been removed from server`
              )
            } else if (err.response.status === 400) {
              showNotification(err.response.data.error)
            }
          })
      }
    } else {
      personService
        .create(newPerson)
        .then((newPerson) => {
          showNotification(`Added ${newName}`, "success")
          setPersons([...persons, newPerson])
          clearInputs()
        })
        .catch((err) => {
          showNotification(err.response.data.error)
        })
    }
  }

  const deletePerson = (id, name) => {
    if (confirm(`Delete ${name} ?`)) {
      personService.deleteContact(id).then(() => {
        showNotification(`Deleted ${name}`, "success")
        personService.getAll().then((persons) => setPersons(persons))
      })
    }
  }

  const clearInputs = () => {
    setNewName("")
    setNewNumber("")
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const filteredPersons = persons.filter(({ name }) =>
    new RegExp(filterText, "i").test(name)
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />
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
      <Persons persons={filteredPersons} onDeleteContact={deletePerson} />
    </div>
  )
}

export default App
