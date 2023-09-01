const Concert = require('../models/concertModel');
const mongoose = require('mongoose');

// get all concerts
const getConcerts = async (req, res) => {
    const { location, payStatus, composer, instrument } = req.body;

    let filteredConcerts=[];
    let secondFilter = [];

    // const concerts = (await Concert.find({payStatus, instruments: { $in: instrument } }).populate('group', 'name region location'));
    // Get all concerts
    const concerts = (await Concert.find({}).populate('group', 'name region location',).sort({date: 1})).filter(concert => (concert.date >= new Date()));
    // const concerts = (await Concert.find({}).populate('group', 'name region location'));

    // Apply filters if present
    if (payStatus) {
        filteredConcerts = concerts.filter(concert => concert.payStatus === Boolean(payStatus));
    }

    // This looks to be working for composer filtering
    if (composer) {
        // console.log('composer present', composer)
        for (let i = 0; i < filteredConcerts.length; i++ ) {
            // console.log(filteredConcerts[i].pieces.length > 1)
            for (let j = 0; j < filteredConcerts[i].pieces.length; j++) {
                // console.log(filteredConcerts[i].pieces[j])
                if (filteredConcerts[i].pieces[j].composer == composer) {
                    // console.log(filteredConcerts[i])
                    // filteredConcerts.slice(filteredConcerts[i], 1);
                    secondFilter.push(filteredConcerts[i]);
                    console.log('second', secondFilter)
                }
            }
        }
        // console.log('filtered', filteredConcerts)
    }
    
    // if (location) {
    //     filteredConcerts.filter(concert => concert.group.region !== location)
    // }

    // res.send({queries: {location, payStatus, composer, instrument}, concerts});
    
    // const concerts = (await Concert.find({}).populate('group', 'name region location',).sort({date: 1})).filter(concert => (concert.date >= new Date()));

    res.status(200).json(concerts);
}

// get a single concert
const getConcert = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such concert'});
    }

    const concert = await Concert.findById(id).populate('group');;

    if (!concert) {
        return res.status(404).json({error: 'No such concert'});
    }

    res.status(200).json(concert);
}

// create a concert
const createConcert = async (req, res) => {
    const { date, location, payStatus, pieces, instruments } = req.body;
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

    try {
        const concert = await Concert.create({ group: user_id, date: new Date(date), location, payStatus, pieces, instruments });
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