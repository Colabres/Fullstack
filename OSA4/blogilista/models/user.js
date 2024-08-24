const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {type:String, require: true,minlength:3,unique:true},
  passwordHash: {type:String,require: true}
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User