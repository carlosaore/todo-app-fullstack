const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api', cors(), (req, res) => {
    const retro = [
        {id: 1, text: 'This went well, etc.', upVotes: 3, downVotes: 0},
        {id: 2, text: 'Yes and no.', upVotes: 4, downVotes: 3},
        {id: 3, text: 'Nothing went well, etc.', upVotes: 1, downVotes: 0},
    ];
    res.status(201).json(retro);
});

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
    });
}

module.exports = app;