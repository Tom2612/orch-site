const express = require('express');
const router = express.Router();
const { getConcert, getConcerts, updateConcert, createConcert, deleteConcert } = require('../controllers/concertControllers');

// get all concerts
router.get('/', getConcerts);

// get a single concert
router.get('/:id', getConcert)

// create a concert
router.post('/', createConcert)

// update a concert
router.patch('/:id', updateConcert)

// delete a concert
router.delete('/:id', deleteConcert)

module.exports = router;