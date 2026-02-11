const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// This matches exports.googleAuth in your controller
router.post('/google', authController.googleAuth);

// This matches exports.verifyEmail in your controller
router.get('/verify', authController.verifyEmail);

// If you want a manual signup, you MUST add exports.signup to your controller first
// router.post('/signup', authController.signup); 

module.exports = router;