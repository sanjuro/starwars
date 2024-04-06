const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Protected route for getting user details
router.get('/details', authMiddleware, userController.getUserDetails);

// Protected route for updating user details
router.put('/update', authMiddleware, userController.updateUserDetails);

module.exports = router;
