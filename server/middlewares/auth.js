const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  // If token doesnt exist, require it
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    // Break jwt token and validate if user exists
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken.userId);

    // If user doesnt exist, return message
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // If user is not admin, return message
    const authorized = await user.checkAdminStatus();
    if(!authorized){
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    // Set request user
    req.user = user;
    next();
  } catch (error) {
    // If token isnt valid anymore, return messge
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticate };