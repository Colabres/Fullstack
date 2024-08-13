const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.static('dist'))
const cors = require('cors')

app.use(cors())
morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Mary Poppendieck",
      Snumber: "39-23-6423122"
    }
  ]
  app.get('/', (request, response) => {
    response.send('<h1>If you see this then disc is missing</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    console.log(persons)
    response.json(persons)
  })
  app.post('/api/persons', (request, response) => {
    
    const { name, number } = request.body;
    
    if (!name) {
        return response.status(400).json({ error: 'Name is required' })
    }
    if (!number) {
        return response.status(400).json({ error: 'Number is required' })
    }
    const nameExists = persons.some(person => person.name === name)
    if (nameExists) {
        return response.status(400).json({error: 'name must be unique' })
    }
    const newperson = {id: Math.floor(Math.random() * 100000), name : name, number : number }
    persons = persons.concat(newperson)
    response.status(201).json({newperson})   
  })
  app.get('/api/info', (request, response) => {
    const date = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p> <p>${date}</p>`)
  })
  app.put('/api/persons/:id',(request, response) => {
    console.log(request.body)
    const name = request.body.name
    const newnumber = request.body.number
    const person = persons.find(person => person.name === name)
    person.number = newnumber
    console.log(person)
    console.log(persons)
    response.json(person)  
  })
  
  //get 1 note of :id 
  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  //delete 1 note of :id
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(persons)
    console.log(id)
    persons = persons.filter(person => person.id !== id)  
    console.log(persons)
    response.status(204).end()
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })