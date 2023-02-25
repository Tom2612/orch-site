const express = require('express');
const router = express.Router();
const { getConcert, getConcerts, updateConcert, createConcert, deleteConcert } = require('../controllers/concertControllers');
const { isAuthor, isValid } = require('../middleware/middleware.js'); 

// get all concerts
router.get('/', getConcerts);

// get a single concert
router.get('/:id', getConcert);

// create a concert
router.post('/', isValid, createConcert);

// update a concert
router.patch('/:id', isValid, isAuthor, updateConcert);

// delete a concert
router.delete('/:id', isValid, isAuthor, deleteConcert);

module.exports = router;