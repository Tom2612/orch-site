const express = require('express');
const Piece = require('../models/pieceModel');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({mssg: 'Get all pieces'})
})

router.get('/:id', (req, res) => {
    res.json({mssg: 'Get one piece'})
})

router.post('/', async (req, res) => {
    const { title, composer, instruments } = req.body;

    try {
        const piece = await Piece.create({title, composer, instruments});
        res.status(200).json(piece);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
})

router.patch('/:id', (req, res) => {
    res.json({mssg: 'Update a piece'})
})

router.delete('/:id', (req, res) => {
    res.json({mssg: 'delete a piece'})
})

module.exports = router;