const Concert = require('../models/concertModel');
const mongoose = require('mongoose');

// get all concerts
const getConcerts = async (req, res) => {
    const concerts = await Concert.find({}).populate('orchestra').sort({createdAt: -1});

    res.status(200).json(concerts);
}

// get a single concert
const getConcert = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such concert'});
    }

    const concert = await Concert.findById(id).populate('orchestra');

    if (!concert) {
        return res.status(404).json({error: 'No such concert'});
    }

    res.status(200).json(concert);
}

// create a concert
const createConcert = async (req, res) => {
    const { date, location, payStatus, pieces, instruments } = req.body;

    try {
        // Change this to be a dynamic id when group logged in!
        const concert = await Concert.create({ orchestra: '63ddfb34530f16621b17cdb1', date, location, payStatus, pieces, instruments });
        res.status(200).json(concert);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

// update a concert
const updateConcert = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such concert'})
    }

    const concert = await Concert.findOneAndUpdate({_id : id}, {...req.body});

    if (!concert) {
        return res.status(404).json({error: 'No such concert'});
    }
    
    res.status(200).json(concert);
}

// delete a concert
const deleteConcert = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such concert'});
    }

    const concert = await Concert.findOneAndDelete({_id: id});

    if (!concert) {
        return res.status(404).json({error: 'No such concert'});
    }

    res.status(200).json(concert);
}

module.exports = {
    getConcerts,
    getConcert,
    createConcert,
    updateConcert,
    deleteConcert
}