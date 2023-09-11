const Concert = require('../models/concertModel');
const mongoose = require('mongoose');

// get all concerts
const getConcerts = async (req, res) => {
    const { region, payStatus, composer, instrument } = req.body;

    const filters = {};

    if (payStatus) {
        filters.payStatus = payStatus;
    }
    if (instrument) {
        filters.instruments = instrument.toLowerCase()
    }
    if (composer) {
        filters['pieces.composer'] = composer.toLowerCase()
    }

    // Not yet working
    if (region) {
        // filters['group.region'] = region;
        filters.region = region;
    }

    const currentDate = new Date();
    filters.date = { $gte: currentDate }

    const concerts = await Concert.find(filters)
        .populate('group', 'name location region')
        .sort({date: 1})

    res.status(200).json(concerts);

}

// get a single concert
const getConcert = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such concert'});
    }

    const concert = await Concert.findById(id).populate('group', 'location region name');;

    if (!concert) {
        return res.status(404).json({error: 'No such concert'});
    }

    res.status(200).json(concert);
}

// create a concert
const createConcert = async (req, res) => {
    const { date, location, payStatus, pieces, instruments, region } = req.body;
    // Backend validators
    let emptyFields = [];

    if (!date) {
        emptyFields.push('date');
    }
    if (!location) {
        emptyFields.push('location');
    }
    if (pieces.length === 0) {
        emptyFields.push('pieces');
    }
    if(pieces.map(piece => {
        !piece.composer || !piece.title ? emptyFields.push('pieces') : piece
    }))
    if (instruments.length === 0) {
        emptyFields.push('instruments');
    }
    if(instruments.map(instrument => {
        !instrument ? emptyFields.push('instruments') : instrument
    }))
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields});
    }

    const user_id = req.user._id;

    const thisconcert = {
        group: user_id,
        date: new Date(date),
        location: location.toLowerCase(),
        region,
        payStatus,
        pieces: pieces.forEach(piece => {piece.composer = piece.composer.toLowerCase()}),
        instruments: instruments.map(instrument => instrument.toLowerCase())
    }

    try {
        console.log(thisconcert);
        // const concert = await Concert.create({ group: user_id, date: new Date(date), location, payStatus, pieces, instruments, region });
        const concert = await Concert.create(thisconcert);
        res.status(200).json(concert);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

// update a concert
const updateConcert = async (req, res) => {
    const { date, location, pieces, instruments } = req.body;

    // Backend validators
    let emptyFields = [];

    if (!date) {
        emptyFields.push('date');
    }
    if (!location) {
        emptyFields.push('location');
    }
    if (pieces.length === 0) {
        emptyFields.push('pieces');
    }
    if (instruments.length === 0) {
        emptyFields.push('instruments');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields});
    }

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such concert'})
    }
    
    const concert = await Concert.findOneAndUpdate({_id : id}, {...req.body}, {runValidators: true});

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