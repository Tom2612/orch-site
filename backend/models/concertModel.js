const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const concertSchema = new Schema({
    orchestra: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    payStatus: {
        type: Boolean,
        required: true
    },
    pieces: {
        type: Array,
        required: false
    },
    instruments: {
        type: Array,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Concert', concertSchema);