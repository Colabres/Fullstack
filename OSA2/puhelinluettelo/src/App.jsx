import Number from './components/Number'
import React, { useState } from 'react';

const App = (props) => {


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

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }



  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('*')
  const [newNumber, setNewNumber] = useState('*')
  const [search, setNewSearch] = useState('')
  const personsToShow = search === '' ? 
  persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter show with: <input value={search} onChange={handleFilterChange}/></div>
      <h2>add a new</h2>
      <form onSubmit={addNumber}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>        
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>        
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      ...
      <ul>
        {personsToShow.map(person =>
          <Number key={person.name} name={person.name} number={person.number} />
        )}
      </ul>
    </div>
  )
}
export default App

