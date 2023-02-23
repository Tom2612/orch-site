const express = require('express');
const router = express.Router();
const { getConcert, getConcerts, updateConcert, createConcert, deleteConcert } = require('../controllers/concertControllers');
const isValid = require('../middleware/middleware');

// get all concerts
router.get('/', getConcerts);

// get a single concert
router.get('/:id', getConcert);

// create a concert
router.post('/', isValid, createConcert);

// update a concert
router.patch('/:id', isValid, updateConcert);

// delete a concert
router.delete('/:id', isValid, deleteConcert);

module.exports = router;