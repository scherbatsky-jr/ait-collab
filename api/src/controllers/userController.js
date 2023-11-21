const userService = require('../services/userService');

function updateUser(req, res) {
  const userId = req.user.userId;
  const updateData = req.body;

  userService.updateUser(userId, updateData)
    .then((response) => {
        res.json(response)
    })
}

const getConnections = (req, res) => {
  const userId = req.user.userId

  userService.getConnections(userId)
    .then(response => {
      res.json({ connections: response})
    })
}

const getSuggestions = async (req, res) => {
  const userId = req.user.userId

  try {
    const suggestions = await userService.getSuggestions(userId);
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const sendConnectionRequest= async (req, res) => {
  try {
    const userId = req.user.userId
    const targetUserId = req.body.targetUserId;

    const result = await userService.sendConnectionRequest(userId, targetUserId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const acceptConnectionRequest = async (req, res) => {
  try {
    const userId = req.user.userId
    const requesterId = req.body.requesterId;

    const result = await userService.acceptConnectionRequest(userId, requesterId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getPendingConnectionRequests = async (req, res) => {
  try {
    const userId = req.user.userId

    const pendingRequests = await userService.getPendingConnectionRequests(userId);

    res.status(200).json(pendingRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  updateUser,
  getConnections,
  getSuggestions,
  sendConnectionRequest,
  getPendingConnectionRequests,
  acceptConnectionRequest
};
