const User = require('../models/user');
const ResetToken = require('../models/resetToken');

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

exports.generateResetToken = async (user) => {
// Generate a password reset token and save it in the database
const token = require('crypto').randomBytes(32).toString('hex');
const resetToken = new ResetToken({ userId: user._id, token });
await resetToken.save();
return token;
};

exports.verifyResetToken = async (token) => {
// Verify if the reset token exists and is valid
return ResetToken.findOne({ token });
};

exports.resetPassword = async (user, newPassword) => {
// Reset the user's password
user.setPassword(newPassword, (err) => {
    if (err) {
    throw err;
    }
    user.save();
});
};
