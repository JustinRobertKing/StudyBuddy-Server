let mongoose = require('mongoose');

let sessionSchema = new mongoose.Schema({
	senderId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	senderName: {
		type: String,
		required: true
	},
	recipientId:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	recipientName: {
		type: String,
		required: true
	},
	time: String,
	date: String,
	senderComment: String,
	recipientComment: String,
	accepted: {
		type: Boolean,
		default: false
	},
	rejected: {
		type: Boolean,
		default: false
	},
	senderCancel: {
		type: Boolean,
		default: false
	},
	recipientCancel: {
		type: Boolean,
		default: false
	}
})


module.exports = mongoose.model('Session', sessionSchema);