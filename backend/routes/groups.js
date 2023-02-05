const express = require('express');
const mongoose = require('mongoose');
const { getGroup, getGroups, createGroup } = require('../controllers/groupController');

const router = express.Router();

// group routes
router.get('/', getGroups);
router.get('/:id', getGroup);
router.post('/', createGroup);

module.exports = router;