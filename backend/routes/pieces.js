const express = require('express');
const { createPiece, getPieces, getPiece } = require('../controllers/pieceController');
const router = express.Router();

router.get('/', getPieces)

router.get('/:id', getPiece)

router.post('/', createPiece)

router.patch('/:id', (req, res) => {
    res.json({mssg: 'Update a piece'})
})

router.delete('/:id', (req, res) => {
    res.json({mssg: 'delete a piece'})
})

module.exports = router;