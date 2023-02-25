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
        res.status(401).json({error: 'Request is not authorized'});
    }
}

const isAuthor = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: 'Authorization required'});
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);

        const { id } = req.params;
        const concert = await Concert.findById(id).populate('group');
        console.log('id check', _id, concert.group.id);
        console.log(_id === concert.group.id ? 'true' : 'false');

        if (!concert.group.equals(_id)) {
            return res.status(401).json({error: 'Not authorized'});
        }
        console.log('Authorized!');
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'You are not authorized to do that.'});
    }
}

module.exports = { 
    isValid, 
    isAuthor 
};