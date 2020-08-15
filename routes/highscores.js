const router = require('express').Router()
let HighScore = require('../models/highscore.model')

router.route('/').get((req, res) => {
	HighScore.find()
		.then(highscores => res.json(highscores))
		.catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/').post((req, res) => {
	const { name, highscore } = req.body
	const newHighScore = new HighScore({ name, highscore })

	newHighScore.save()
		.then(() => res.json('Highscore added!'))
		.catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router