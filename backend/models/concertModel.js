const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const concertSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId, ref: 'Group',
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
    // Rechange this back to array and input data from form
    pieces: [
        {
            composer: String,
            piece: String
        }
    ],
    instruments: {
        type: Array,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Concert', concertSchema);