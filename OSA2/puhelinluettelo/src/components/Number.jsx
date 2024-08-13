import React from 'react';

const Numbers = ({ personsToShow, onDelete }) => {
  console.log(personsToShow)
  return (
    <div>
      {personsToShow.map(person => (
        <p key={person.id}>
          {person.name} {person.number}  
          <button onClick={() => onDelete(person.name)}>Delete</button>
        </p>
      ))}
    </div>
  )
}

export default Numbers