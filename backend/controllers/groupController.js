const Group = require('../models/groupModel');
const mongoose = require('mongoose');

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

const createGroup = async (req, res) => {
    const { name, location, contact } = req.body;

    try {
        const group = await Group.create({ name, location, contact });
        res.status(200).json(group);
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

module.exports = {
    getGroups,
    getGroup,
    createGroup
}