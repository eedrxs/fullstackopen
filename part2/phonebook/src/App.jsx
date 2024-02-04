import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"

import contactService from "./services/contacts"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterText, setFilterText] = useState("")
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    contactService.getAll().then((contacts) => setPersons(contacts))
  }, [])

  const addContact = (e) => {
    e.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const existingContact = persons.find(({ name }) => name === newName)
    
    if (existingContact) {
      const wantsToEdit = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (wantsToEdit) {
        contactService
          .update(existingContact.id, newPerson)
          .then(() => {
            showNotification(`Updated ${newName}`, "success")
            contactService.getAll().then((contacts) => {
              setPersons(contacts)
              clearInputs()
            })
          })
          .catch((err) => {
            if (err.response.status === 404) {
              showNotification(
                `Information of ${newName} has already been removed from server`
              )
            }
          })
      }
    } else {
      contactService.create(newPerson).then((newContact) => {
        showNotification(`Added ${newName}`, "success")
        setPersons([...persons, newContact])
        clearInputs()
      })
    }
  }

  const deleteContact = (id, name) => {
    if (confirm(`Delete ${name} ?`)) {
      contactService.deleteContact(id).then(() => {
        showNotification(`Deleted ${name}`, "success")
        contactService.getAll().then((contacts) => setPersons(contacts))
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
        onAddPerson={addContact}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDeleteContact={deleteContact} />
    </div>
  )
}

export default App
