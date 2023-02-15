const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

groupSchema.virtual('concerts', {
    ref: 'Concert',
    localField: '_id',
    foreignField: 'group'
})

module.exports = mongoose.model('Group', groupSchema);