//this is main module that connects all trhe others
//config holds connection information, logger for log info, express is a server, cors to be able to controll from different ip,
// blogsrouter/blogs hold all the routes and logic, mongoose is a library for mongoDB. 
//require is an import both my modules and librarys
const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors') //moves try-catch under the hood
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })




app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
//app.use(middleware.userExtractor)
app.use('/api/blogs',middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)





logger.info(`Server running on port =) ${config.PORT}`)


module.exports = app
