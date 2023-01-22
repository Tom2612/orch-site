const express = require('express');
const { createPiece, getPieces, getPiece, deletePiece, updatePiece } = require('../controllers/pieceController');
const router = express.Router();

router.get('/', getPieces)

router.get('/:id', getPiece)

router.post('/', createPiece)

router.patch('/:id', updatePiece)

router.delete('/:id', deletePiece)

module.exports = router;