const express = require('express');
const { getGroup, getGroups, signupGroup, loginGroup, updateGroup } = require('../controllers/groupController');
const { isGroupAuthor, isValid } = require('../middleware/middleware.js'); 

const router = express.Router();

// group routes
router.get('/', getGroups);
router.get('/profile', isValid, getGroup);

// Update and Delete groups routes here with validation checks
router.patch('/edit/:id', isValid, isGroupAuthor, updateGroup);

// Group login/signup routes here
router.post('/signup', signupGroup);
router.post('/login', loginGroup);

module.exports = router;