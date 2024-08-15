const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()

const Person = require('./models/persone')

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(requestLogger)

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

let persons = [] 

  app.get('/', (request, response) => {
    response.send('<h1>If you see this then disc is missing</h1>')
  })

  app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
      response.json(people)
    })
  })

  app.post('/api/persons', (request, response,next) => {
    
    const { name, number } = request.body;
    
    if (!name || !number) {
      const error = new Error('Name and number are required');
      error.status = 400; 
      return next(error); 
    }
    // const nameExists = persons.some(person => person.name === name)
    // if (nameExists) {
    //     return response.status(400).json({error: 'name must be unique' })
    // }
    //const newperson = {id: Math.floor(Math.random() * 100000), name : name, number : number }
    const newperson = new Person({
      name: name,
      number: number
    })

    newperson.save().then(savedPerson => {
      console.log(savedPerson)
      response.json({savedPerson})
    })
    //persons = persons.concat(newperson)
    //response.status(201).json({newperson})   
  })

  // app.get('/api/info', (request, response) => {
  //   const date = new Date()
  //   response.send(`<p>Phonebook has info for ${persons.length} people</p> <p> <p>${date}</p>`)
  // })
  app.get('/api/info', (request, response, next) => {
    const date = new Date();   

    Person.countDocuments({})
      .then(count => {        
        response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
      })
      .catch(error => next(error))
  })
  app.put('/api/persons/:id',(request, response,next) => {
    console.log(request.body)
    //const name = request.body.name
    //const newnumber = request.body.number
    //const person = persons.find(person => person.name === name)
    //person.number = newnumber
    //console.log(person)
    //response.json(person)  
    const person = request.body
    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error))
  })

  
  //get 1 note of :id 
  app.get('/api/persons/:id', (request, response,next) => {
    const id = request.params.id
    //const person = persons.find(person => person.id === id)
    Person.findById(id).then(person => {
      response.json(person)
    })
    .catch(error => next(error))
    // if (person) {
    //     response.json(person)
    //   } else {
    //     response.status(404).end()
    //   }
  })

  //delete 1 note of :id
  app.delete('/api/persons/:id', (request, response,next) => {
    //const id = Number(request.params.id)
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
    //console.log(persons)
    //console.log(id)
    //persons = persons.filter(person => person.id !== id)  
    //console.log(persons)
    //response.status(204).end()
  })

  app.use(unknownEndpoint)
  app.use(errorHandler)
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })