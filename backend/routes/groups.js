const express = require('express');
const { getGroup, getGroups, signupGroup, loginGroup } = require('../controllers/groupController');

const router = express.Router();

// group routes
router.get('/', getGroups);
router.get('/:id', getGroup);
router.post('/signup', signupGroup);
router.post('/login', loginGroup);

module.exports = router;