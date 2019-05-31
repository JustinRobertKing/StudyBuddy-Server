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

// POST /session/create route - create a new session
router.post('/create', (req, res) => {
	db.Session.create(req.body)
	.then(createdSession => {
		res.send(createdSession)
	})
	.catch((error) => {
		console.log('Error when getting user', error)
		res.status(500).send({ message: 'Error'})
	})
})

// PUT /session/update route - allows user to accept, reject, or cancel a session
router.put('/update', (req, res) => {
	db.Session.findOneAndUpdate({
		_id: req.body.sessionId
	},
		req.body,
		{ new: true, useFindAndModify: false }
	)
	.then(updatedSession => {
		console.log('updated session: ', updatedSession)
		res.send({ updatedSession })
	})
	.catch((error) => {
		console.log('Error when updating session', error)
		res.status(500).send({ message: 'Error updating'})
	})
})

module.exports = router