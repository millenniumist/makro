const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// Create user
router.post('/signup', userController.createUser);
// Get user profile
router.post('/login', userController.login);

router.get('/profile', userController.getUserProfile);
// Update user profile
router.put('/profile', userController.updateUserProfile);
// Delete user (admin only)
router.delete('/:id', userController.deleteUser);

module.exports = router;
