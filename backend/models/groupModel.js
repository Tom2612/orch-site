const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    concerts: [{
        type: Schema.Types.ObjectId, ref: 'Concert'
    }]
})

module.exports = mongoose.model('Group', groupSchema);