const express = require('express')
const router = express.Router()
const cors = require('cors')
const mongoose = require('mongoose')
const highscoreRouter = require('./routes/highscores')

require('dotenv').config()

const app = express()
app.use(express.static('client/dist'));
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
})

router.use(function (req, res) {
	res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use('/highscores', highscoreRouter)

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`)
})