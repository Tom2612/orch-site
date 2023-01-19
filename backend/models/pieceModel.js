const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PieceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    composer: {
        type: String,
        required: true
    },
    instruments: {
        type: Array,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Piece', PieceSchema);