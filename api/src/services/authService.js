// services/authService.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

function generateAccessToken(user) {
  return jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
}

exports.registerUser = async (userData) => {
  try {
    const newUser = new User(userData);
    return await User.register(newUser, userData.password);
  } catch (error) {
    throw error;
  }
};

exports.authenticateUser = async (username, password) => {
  try {
    return await User.authenticate()(username, password);
  } catch (error) {
    throw error;
  }
};

exports.issueAccessToken = (user) => {
  return generateAccessToken(user);
};
