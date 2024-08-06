import React from 'react';

const Number = ({ name, number, onDelete }) => {
  return (
    <p>{name} {number}  <button onClick={() => onDelete(name)}>Delete</button></p>
  )
}

const Numbers = ({ personsToShow, onDelete }) => {
  return (
    <div>      
      {personsToShow.map(person =>
        <Number key={person.name} name={person.name} number={person.number} onDelete={onDelete} />
      )}
    </div>
  )
}

export default Numbers