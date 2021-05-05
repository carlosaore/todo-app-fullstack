const express = require('express');
const pool = require('./conf')
const app = express();
const cors = require('cors');
const path = require('path')

// global middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Allow cors policies
app.use(cors())

app.get('/api/board', cors(), (req, res) => {

    const boardData = {};

    //Getting a connection from the pool
	pool.getConnection(function(err, connection) {
		// Not connected!
		if (err) console.error(err);

		//Using the connection.
		connection.query('SELECT * FROM went_well', (err, data) => {
			if (err) {
				console.error(err);
				res.status(500).send('Server error, could not fetch from DB');
			} else {
				boardData['wentWell'] = data;
			}
		});

		connection.query('SELECT * FROM to_improve', (err, data) => {
			if (err) {
				console.error(err);
				res.status(500).send('Server error, could not fetch from DB');
			} else {
				boardData['toImprove'] = data;
			}
		});

		connection.query('SELECT * FROM action_items', (err, data) => {
			if (err) {
				console.error(err);
				res.status(500).send('Server error, could not fetch from DB');
			} else {
				boardData['actionItems'] = data;
				res.status(200).json(boardData)
			}
		});

		//Realising the connection.
		connection.release();

		// Handle error after the release.
		if (err) console.error(err);

		// Don't use the connection here, it has been returned to the pool.
	})
});

//Serve static assets if in production.
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
    });
}

module.exports = app;