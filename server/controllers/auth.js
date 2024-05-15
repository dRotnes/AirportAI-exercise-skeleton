const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Register a new user
const register = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  try {
    const user = new User({ username, email, password, role });
    await user.save();
    
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    next(error);
    // return res.status(500).json({error: error.message})
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    // If user doesnt exist return message
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await user.comparePassword(password);
    // If password doesnt match return message
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Create JWT token and return it
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1 hour'
    });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
    // return res.status(500).json({error: error.message})
  }
};

module.exports = { register, login }