const jwt = require('jsonwebtoken');
const Group = require('../models/groupModel');
const Concert = require('../models/concertModel');

const isValid = async (req, res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(401).json({error: 'Authorization required'});
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await Group.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({error: 'Request is not valid'});
    }
}

const isConcertAuthor = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: 'Authorization required'});
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);

        const { id } = req.params;
        
        const concert = await Concert.findById(id).populate('group');

        if (!concert.group.equals(_id)) {
            return res.status(401).json({error: 'You are not authorized to do that.'});
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'You are not authorized to do that.'});
    }
}

const isGroupAuthor = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: 'Authorization required'});
    }

    const token = authorization.split(' ')[1];

    const { _id } = jwt.verify(token, process.env.SECRET);
    const { id } = req.params;

    const group = await Group.findById(id).select('_id');

    if (!group.equals(_id)) {
        return res.status(401).json({error: 'You are not authorized to do that.'});
    }

    next();

}

module.exports = { 
    isValid, 
    isConcertAuthor,
    isGroupAuthor
};