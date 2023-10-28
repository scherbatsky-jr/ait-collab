const User = require('../models/user');
const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const newUser = await authService.registerUser(req.body);
    const token = authService.issueAccessToken(newUser);
    res.json({ message: 'Registration and login successful.', token: token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Registration failed.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authService.authenticateUser(username, password);
    const token = authService.issueAccessToken(user);
    res.json({ message: 'Login successful.', token: token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Login failed.' });
  }
};
