import Number from './components/Number'
import React, { useState } from 'react';

const App = (props) => {
  // const [notes, setNotes] = useState(props.notes)
  //const [newName, setNewNumber] = useState('a new entry...') 
  // const [showAll, setShowAll] = useState(true)

  //works on submit
  const addNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    const personObject = {
      name: newName,   
      number:newNumber
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
  // const notesToShow = showAll
  //   ? notes
  //   : notes.filter(note => note.important === true)

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('*')
  const [newNumber, setNewNumber] = useState('*')


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>        
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>        
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      ...
      <ul>
        {persons.map(person =>
          <Number key={person.name} name={person.name} number={person.number} />
        )}
      </ul>
    </div>
  )
}
export default App

