const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({mssg: 'Get all pieces'})
})

router.get('/:id', (req, res) => {
    res.json({mssg: 'Get one piece'})
})

router.post('/', (req, res) => {
    res.json({mssg: 'Create a new piece'})
})

router.patch('/:id', (req, res) => {
    res.json({mssg: 'Update a piece'})
})

router.delete('/:id', (req, res) => {
    res.json({mssg: 'delete a piece'})
})

module.exports = router;