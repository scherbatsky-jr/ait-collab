const User = require('../models/user');

function updateUser(userId, updateData) {
    return User.findByIdAndUpdate(userId, updateData, { new: true })
      .exec()
      .catch((err) => {
        console.error(err);
        return null; // Handle errors appropriately
      });
  }

module.exports = {
    updateUser,
};
