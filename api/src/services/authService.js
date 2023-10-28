const User = require('../models/user');
const jwt = require('jsonwebtoken');

require('dotenv').config();

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
    return new Promise((resolve, reject) => {
        User.authenticate()(username, password, (err, user) => {
          if (err || !user) {
            reject(err);
          } else {
            resolve(user);
          }
        });
      });
};

exports.issueAccessToken = (user) => {
  return generateAccessToken(user);
};
