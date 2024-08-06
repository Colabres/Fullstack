import Filter from './components/Filter'
import React, { useState } from 'react';
import Numbers from './components/Number';
import PersonForm from './components/PersonForm';
import { useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


const App = (props) => {
  
  useEffect(() => {
    personService
      .getAll()
        .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  //works on submit
  const addNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      console.log("hep")
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(p => p.name === newName)
        const changedNote = { ...person, number: newNumber }

        personService
          .update(changedNote.id, changedNote)
            .then(returnedData => {
            setPersons(persons.map(person => person.id !== changedNote.id ? person : returnedData))            
          })

        setNewName('')
        setNewNumber('')
      }
      //alert(`${newName} is already added to phonebook`)

      return
    }

    const personObject = {
      name: newName,   
      number:newNumber
    }

    personService
    .create(personObject)
      .then(returnedData => {
      setPersons(persons.concat(returnedData))
      setNewName('')
      setNewNumber('')
    })
  

  }
  //handels any change in input
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }
  const handleDelete = name => {    
    const person = persons.find(p => p.name === name)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .del(person.id)
      .then(() => {
        setPersons(persons.filter(person => person.name !== name));
      })
      // .catch(error => {
      //   alert(
      //     `the note '${note.content}' was already deleted from server`
      //   )
      //   setNotes(notes.filter(n => n.id !== id))
      // })
    }
    
  }
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('*')
  const [newNumber, setNewNumber] = useState('*')
  const [search, setNewSearch] = useState('*')
  const personsToShow = search === '' ? 
  persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleFilterChange={handleFilterChange} ></Filter>
      
      <h2>add a new</h2>
      <PersonForm addNumber={addNumber} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      ...      
      <ul>
      <Numbers personsToShow={personsToShow} onDelete={handleDelete} />
      </ul>
    </div>
  )
}
export default App

