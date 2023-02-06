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
    contact: {
        type: String,
        required: true
    },
    // concerts: [{
    //     type: Schema.Types.ObjectId, ref: 'Concert'
    // }]
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