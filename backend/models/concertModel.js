const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const concertSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId, ref: 'Group',
    },
    date: {
        type: Date,
        required: true,
        _id: false
    },
    location: {
        type: String,
        required: true
    },
    region : {
        type: String,
        enum: ['East Midlands', 'East of England', 'London', 'North East', 'North West', 'Northern Ireland', 'Scotland', 'South East', 'South West', 'Wales', 'West Midlands', 'Yorkshire and The Humber'],
        required: true
    },
    payStatus: {
        type: Boolean,
        required: true
    },
    pieces: [
        {
            _id: false,
            composer: String,
            title: String
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