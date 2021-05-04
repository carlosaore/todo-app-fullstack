const express = require('express');
const connection = require('./conf')
const app = express();
const cors = require('cors');
const path = require('path')

// global middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Allow cors policies
app.use(cors())

// Connecting to the DB
connection.connect((err)=>{
    if(err) {
        console.error(`Error trying to reach the DB. Error: ${err}`)
        return;
    }
    console.log('Successfully connected to the DB')
});

connection.on('error', err => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        // db error reconnect
        console.error('Disconnected by clearDB due to inactivity. You need to fix this');
    } else {
        throw err;
    }
});

app.get('/api', cors(), (req, res) => {

    const boardData = {};

    connection.query('SELECT * FROM went_well', (err, data) => {
        if(err) {
            res.status(500).send('Server error, could not fetch from DB');
        }
        else {
            boardData['wentWell'] = data;
        }
    });

    connection.query('SELECT * FROM to_improve', (err, data) => {
        if(err) {
            res.status(500).send('Server error, could not fetch from DB');
        }
        else {
            boardData['toImprove'] = data;
        }
    });

    connection.query('SELECT * FROM action_items', (err, data) => {
        if(err) {
            res.status(500).send('Server error, could not fetch from DB');
        }
        else {
            boardData['actionItems'] = data;
            res.status(200).json(boardData)
        }
    });
});

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
    });
}

module.exports = app;