//this is my first refactored reactor app.. this module imports main module config and runs .listen to connect to data that it gets from config.
const app = require('./app') // varsinainen Express-sovellus
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})