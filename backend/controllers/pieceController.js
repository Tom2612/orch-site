const Piece = require('../models/pieceModel');
const mongoose = require('mongoose');

// get all piece
const getPieces = async (req, res) => {
    const pieces = await Piece.find({}).sort({createdAt: -1});

    res.status(200).json(pieces);
}
// get single piece
const getPiece = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such piece'})
    }
    
    const piece = await Piece.findById(id)

    if (!piece) {
        return res.status(404).json({error: 'No such piece'});
    }

    res.status(200).json(piece);
}
// create new piece
const createPiece = async (req, res) => {
    const { title, composer, instruments } = req.body;

    try {
        const piece = await Piece.create({title, composer, instruments});
        res.status(200).json(piece);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}
// delete a piece

//update a piece

module.exports = {
    getPieces,
    getPiece,
    createPiece
}