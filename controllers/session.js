require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const db = require('../models')

// GET /session route - retrieve session info for the logged in user
router.get('/', (req, res) => {
	db.Session.find({
		$or: [
			{ senderId: req.body._id },
			{ recipientId: req.body._id }
		]
	})
	.then(foundSessions => {
		res.send(foundSessions)
	})
	.catch((error) => {
		console.log('Error when getting user', error)
		res.status(500).send({ message: 'Error'})
	})
})

// POST /session route - create a new session
router.post('/', (req, res) => {
	db.Session.create(req.body)
	.then(createdSession => {
		res.send(createdSession)
	})
})


// PUT /session/update route - allows user to accept, reject, or cancel a session

module.exports = router