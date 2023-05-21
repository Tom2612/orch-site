const Group = require('../models/groupModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id, }, process.env.SECRET, {expiresIn: '3d'})
}

// Admin view of all groups
const getGroups = async (req, res) => {
    const allGroups = await Group.find({}).populate({ path: 'concerts'});

    res.status(200).json(allGroups);
}

// Need to display specific group info here
const getGroup = async (req, res) => {

    const user_id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({error: 'No such group'});
    }

    const group = await Group.findById(user_id).populate('concerts');

    if (!group) {
        return res.status(400).json({error: 'No such group'});
    }

    res.status(200).json(group);
}

const updateGroup = async (req, res) => {

    const { name, region, location } = req.body;

    // Backend validators
    let emptyFields = [];

    if (!name) {
        emptyFields.push('name');
    }
    if (!region) {
        emptyFields.push('region');
    }
    if (!location) {
        emptyFields.push('location');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields});
    }
    
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such group'})
    }

    try {
        const group = await Group.findOneAndUpdate({ _id: id}, {...req.body}, {runValidators: true});
        return res.status(200).json(group);
    } catch (e) {
        console.log(e.message);
        return res.status(404).json({error: 'Could not update group', message: e.message});
    }
}

const signupGroup = async (req, res) => {
    const { email, password, name, region, location, phone = null, description = null } = req.body;

    let emptyFields = [];

    if (!name) {
        emptyFields.push('name');
    }
    if (!location) {
        emptyFields.push('location');
    }
    if (!region) {
        emptyFields.push('region');
    }
    if (!email) {
        emptyFields.push('email');
    }
    if (!password) {
        emptyFields.push('password');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields.', emptyFields});
    }

    try {
        const group = await Group.signup(email, password, name, region, location, phone, description);

        // create token
        const token = createToken(group._id);

        res.status(200).json({email, token});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

const loginGroup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const group = await Group.login(email, password);

        const token = createToken(group._id);

        res.status(200).json({email, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getGroups,
    getGroup,
    signupGroup,
    loginGroup,
    updateGroup
}