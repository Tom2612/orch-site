const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const concertSchema = new Schema({
    orchestra: {
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
    // pieces: [
    //     {
    //         composer: String,
    //         piece: String
    //     }
    // ],
    pieces: String,
    instruments: {
        type: [String],
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Concert', concertSchema);