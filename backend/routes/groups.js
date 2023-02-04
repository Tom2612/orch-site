const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Group = require('../models/groupModel');


// group routes
router.post('/', async (req, res) => {
    const { name, location, contact } = req.body;

    try {
        const group = await Group.create({ name, location, contact });
        res.status(200).json(group);
    } catch (e) {
        res.status(400).json({error: e.message})
    }
})

module.exports = router;