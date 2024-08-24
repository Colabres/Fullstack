const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    console.log('I AM ACTIVE')
    const authorization = request.get('authorization')
    console.log(authorization)
    if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '')
    } else {
      request.token = null
    }
    next() 
  }
  const userExtractor = async (request, response, next) => {
    console.log('UserExtractor: at work');
    const token = request.token;
    console.log('Token in userExtractor:', token);

    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET);
            if (decodedToken.id) {
                const user = await User.findById(decodedToken.id);
                request.user = user || null;
                console.log('Extracted user:', request.user);
            } else {
                request.user = null;
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            return response.status(401).json({ error: 'Token invalid' });
        }
    } else {
        request.user = null;
    }

    next();
    }


    
  

  module.exports = {
    tokenExtractor,userExtractor,
    // You can add more middleware functions here if needed
  }