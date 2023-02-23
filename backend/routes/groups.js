const express = require('express');
const { getGroup, getGroups, signupGroup, loginGroup } = require('../controllers/groupController');
const isValid = require('../middleware/middleware');

const router = express.Router();

// router.use(isValid);

// group routes
router.get('/', getGroups);
router.get('/profile', isValid, getGroup);
// Update and Delete groups routes here with validation checks

// Group login/signup routes here
router.post('/signup', signupGroup);
router.post('/login', loginGroup);

module.exports = router;