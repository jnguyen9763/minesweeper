const mongoose = require('mongoose')

const Schema = mongoose.Schema

const highscoreSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	},
	highscore: {
		type: Number,
		required: true
	}
}, {
	timestamps: true
})

const HighScore = mongoose.model('HighScore', highscoreSchema)

module.exports = HighScore