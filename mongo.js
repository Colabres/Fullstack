const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://pallen:${password}@cluster0.rhbv1.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('person', personSchema)


if (process.argv.length==5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      })
      
    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
      })
  }

if (process.argv.length==3) {
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
        const formattedName = person.name.replace(/_/g, ' ')
        console.log(formattedName+" "+person.number)          
        })
        mongoose.connection.close()
      })
}



