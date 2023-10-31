const userService = require('../services/userService');

function updateUser(req, res) {
  const userId = req.user.userId;
  const updateData = req.body;

  userService.updateUser(userId, updateData)
    .then((response) => {
        res.json(response)
    })
}

module.exports = {
  updateUser,
};
