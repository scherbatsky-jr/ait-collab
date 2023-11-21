const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/update', userController.updateUser);
router.get('/connections', userController.getConnections)
router.get('/suggestions', userController.getSuggestions);

router.post('/send-connection-request', userController.sendConnectionRequest);
router.post('/accept-connection-request', userController.acceptConnectionRequest);
router.get('/pending-connection-requests', userController.getPendingConnectionRequests);

module.exports = router;
