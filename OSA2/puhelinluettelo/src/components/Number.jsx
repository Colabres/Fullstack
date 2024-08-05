import React from 'react';

const Number = ({ name, number }) => {
  return (
    <p>{name} {number}</p>
  )
}

// Numbers.js
const Numbers = ({ personsToShow }) => {
  return (
    <div>      
      {personsToShow.map(person =>
        <Number key={person.name} name={person.name} number={person.number} />
      )}
    </div>
  )
}

export default Numbers