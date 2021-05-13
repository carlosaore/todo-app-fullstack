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

app.post('/api/board/went_well', cors(), (req, res) => {

	const text = req.body.text;

	//Getting a connection from the pool
	pool.getConnection(function(err, connection) {
		// Not connected!
		if (err) console.error(err);

		//Using the connection.
		connection.query(
			"INSERT INTO went_well (text) VALUES(?)",
			text,
			(err) => {
				if (err) {
					console.error(err);
					res.status(500).send("Error");
				} else {
					res.status(201).json({"message":"POST success"});
				}
			}
		);

		//Realising the connection.
		connection.release();

		// Handle error after the release.
		if (err) console.error(err);

		// Don't use the connection here, it has been returned to the pool.
	})

});

app.post('/api/board/to_improve', cors(), (req, res) => {

	const text = req.body.text;

	//Getting a connection from the pool
	pool.getConnection(function(err, connection) {
		// Not connected!
		if (err) console.error(err);

		//Using the connection.
		connection.query(
			"INSERT INTO to_improve (text) VALUES(?)",
			text,
			(err) => {
				if (err) {
					console.error(err);
					res.status(500).send("Error");
				} else {
					res.status(201).json({"message":"POST success"});
				}
			}
		);

		//Realising the connection.
		connection.release();

		// Handle error after the release.
		if (err) console.error(err);

		// Don't use the connection here, it has been returned to the pool.
	})

});

app.post('/api/board/action_items', cors(), (req, res) => {

	const text = req.body.text;

	//Getting a connection from the pool
	pool.getConnection(function(err, connection) {
		// Not connected!
		if (err) console.error(err);

		//Using the connection.
		connection.query(
			"INSERT INTO action_items (text) VALUES(?)",
			text,
			(err) => {
				if (err) {
					console.error(err);
					res.status(500).send("Error");
				} else {
					res.status(201).json({"message":"POST success"});
				}
			}
		);

		//Realising the connection.
		connection.release();

		// Handle error after the release.
		if (err) console.error(err);

		// Don't use the connection here, it has been returned to the pool.
	})

});

app.put('/api/board/reset', cors(), (req, res) => {

	//Getting a connection from the pool
	pool.getConnection(function(err, connection) {
		// Not connected!
		if (err) console.error(err);

		//Using the connection.
		connection.query(
			"TRUNCATE TABLE went_well",
			(err) => {
				if (err) {
					console.error(err);
					res.status(500).send("Error");
				}
			}
		);

		connection.query(
			"TRUNCATE TABLE to_improve",
			(err) => {
				if (err) {
					console.error(err);
					res.status(500).send("Error");
				}
			}
		);

		connection.query(
			"TRUNCATE TABLE action_items",
			(err) => {
				if (err) {
					console.error(err);
					res.status(500).send("Error");
				} else {
					res.status(201).json({"message":"Board was successfully reset"});
				}
			}
		);

		//Realising the connection.
		connection.release();

		// Handle error after the release.
		if (err) console.error(err);

		// Don't use the connection here, it has been returned to the pool.
	})

});

app.put('/api/board/like', cors(), (req, res) => {

	//Getting a connection from the pool
	pool.getConnection(function(err, connection) {
		// Not connected!
		if (err) console.error(err);

		//Using the connection.
		connection.query(
			`UPDATE ${req.body.column} SET likes = likes + 1 WHERE id${req.body.column} = ${req.body.id}`,
			(err) => {
				if (err) {
					console.error(err);
					res.status(500).send("Error");
				} else {
					res.status(201).json({"message":"Successfully liked"});
				}
			}
		);

		//Realising the connection.
		connection.release();

		// Handle error after the release.
		if (err) console.error(err);

		// Don't use the connection here, it has been returned to the pool.
	})

});

app.put('/api/board/unlike', cors(), (req, res) => {

	//Getting a connection from the pool
	pool.getConnection(function(err, connection) {
		// Not connected!
		if (err) console.error(err);

		//Using the connection.
		connection.query(
			`UPDATE ${req.body.column} SET unlikes = unlikes + 1 WHERE id${req.body.column} = ${req.body.id}`,
			(err) => {
				if (err) {
					console.error(err);
					res.status(500).send("Error");
				} else {
					res.status(201).json({"message":"Successfully liked"});
				}
			}
		);

		//Realising the connection.
		connection.release();

		// Handle error after the release.
		if (err) console.error(err);

		// Don't use the connection here, it has been returned to the pool.
	})

});


//UPDATE went_well SET likes = likes + 1 WHERE idwent_well = 4;
//Serve static assets if in production.
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
    });
}

module.exports = app;