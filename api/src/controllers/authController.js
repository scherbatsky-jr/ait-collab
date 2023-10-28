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

exports.requestPasswordReset = async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const token = await authService.generateResetToken(user);

  // Send the reset token to the user via email or other means
  // You can implement your logic to send the token.

  res.json({ message: 'Password reset token sent successfully' });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const resetToken = await authService.verifyResetToken(token);

  if (!resetToken) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  const user = await User.findById(resetToken.userId);
  await authService.resetPassword(user, newPassword);

  res.json({ message: 'Password reset successful' });
};

