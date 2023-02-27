const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    region : {
        type: String,
        enum: ['East Midlands', 'East of England', 'London', 'North East', 'North West', 'Northern Ireland', 'Scotland', 'South East', 'South West', 'Wales', 'West Midlands', 'Yorkshire and The Humber'],
        required: true
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
groupSchema.statics.signup = async function(email, password, name, region, location, phone, description) {

    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email already in use.');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const group = await this.create({ email, password: hash, name, region, location, phone, description });

    return group;
}

groupSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    const group = await this.findOne({ email });

    if (!group) {
        throw Error('Email not found');
    }

    const match = await bcrypt.compare(password, group.password);

    if (!match) {
        throw Error('Incorrect login details');
    }

    return group;
}

groupSchema.virtual('concerts', {
    ref: 'Concert',
    localField: '_id',
    foreignField: 'group'
})

module.exports = mongoose.model('Group', groupSchema);