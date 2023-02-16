const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    description: {
        type: String
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// Statis signup method
groupSchema.statics.signup = async function(email, password, name, location, phone, description) {
    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email already in use.');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const group = await this.create({ email, password: hash, name, location, phone, description });

    return group;
}

groupSchema.virtual('concerts', {
    ref: 'Concert',
    localField: '_id',
    foreignField: 'group'
})

module.exports = mongoose.model('Group', groupSchema);