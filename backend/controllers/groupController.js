const Group = require('../models/groupModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id, }, process.env.SECRET, {expiresIn: '3d'})
}

// Mainly for admin view of all groups
const getGroups = async (req, res) => {
    const allGroups = await Group.find({}).populate({ path: 'concerts'});

    res.status(200).json(allGroups);
}

// Need to display specific group info here
const getGroup = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such group'});
    }

    const group = await Group.findById(id).populate('concerts');

    if (!group) {
        return res.status(400).json({error: 'No such group'});
    }

    res.status(200).json(group);
}

const signupGroup = async (req, res) => {
    const { email, password, name, location, phone = null, description = null } = req.body;

    let emptyFields = [];

    if (!name) {
        emptyFields.push('name');
    }
    if (!location) {
        emptyFields.push('location');
    }
    if (!email) {
        emptyFields.push('email');
    }
    if (!password) {
        emptyFields.push('password');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields});
    }

    try {
        const group = await Group.signup(email, password, name, location, phone, description);

        // create token
        const token = createToken(group._id);

        res.status(200).json({group, token});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

const loginGroup = async (req, res) => {
    res.json({mssg: 'Logging in'});
}

module.exports = {
    getGroups,
    getGroup,
    signupGroup,
    loginGroup
}