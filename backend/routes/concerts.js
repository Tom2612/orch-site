const express = require('express');
const router = express.Router();
const { getConcert, getConcerts, updateConcert, createConcert, deleteConcert } = require('../controllers/concertControllers');
const { isConcertAuthor, isValid } = require('../middleware/middleware.js'); 

// get all concerts
router.get('/', getConcerts);

// get a single concert
router.get('/view/:id', getConcert);

// get a single concert with editing
router.get('/edit/:id', isValid, isConcertAuthor, getConcert);

// create a concert
router.post('/', isValid, createConcert);

// update a concert
router.patch('/:id', isValid, isConcertAuthor, updateConcert);

// delete a concert
router.delete('/:id', isValid, isConcertAuthor, deleteConcert);

module.exports = router;