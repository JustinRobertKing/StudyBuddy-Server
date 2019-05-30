require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const db = require('../models')

// GET /user route - get user info
router.get('/', (req, res) => {
	db.User.findOne({
		_id: req.user._id
	})
	.then(user => {
		console.log('user: ', user)
		res.send({ user })
	})
	.catch((error) => {
		console.log('Error when getting user', error)
		res.status(500).send({ message: 'Error'})
	})
})

// PUT /user/survey route - update survey info
// TODO update input with survey data
router.put('/survey', (req, res) => {
	db.User.findOneAndUpdate({
		_id: req.user._id
	},
		req.body,
		{ new: true, useFindAndModify: false }
	)
	.then(updatedUser => {
		console.log('updated user: ', updatedUser)
		res.send({ updatedUser })
	})
	.catch((error) => {
		console.log('Error when updating user', error)
		res.status(500).send({ message: 'Error updating'})
	})
})

// PUT /user/bio
// TODO update with actual bio info
router.put('/bio', (req, res) => {
	db.User.findOneAndUpdate({
		_id: req.user._id
	},
		req.body,
		{ new: true, useFindAndModify: false }
	)
	.then(updatedUser => {
		console.log('updated user: ', updatedUser)
		res.send({ updatedUser })
	})
	.catch((error) => {
		console.log('Error when updating user', error)
		res.status(500).send({ message: 'Error updating'})
	})
})

// PUT /user/image route - update profile pic
router.put('/image', (req, res) => {
	db.User.findOneAndUpdate({
		_id: req.user._id
	},{
		img: req.body.img,
	},
		{ new: true, useFindAndModify: false }
	)
	.then(updatedUser => {
		console.log('updated user: ', updatedUser)
		res.send({ updatedUser })
	})
	.catch((error) => {
		console.log('Error when updating user', error)
		res.status(500).send({ message: 'Error updating'})
	})
})

module.exports = router;