const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', cors(), (req, res) => {
    const retro = {

        wentWell: [
            {
                id: 1,
                text: 'This went well, etc.',
                upVotes: 3,
                downVotes: 0,
                comments: [
                    "one comment",
                    "another comment"
                ]
            },
        ],

        toImprove: [
            {
                id: 1,
                text: 'Yes and no.',
                upVotes: 4,
                downVotes: 3,
                comments: [
                    "one comment",
                    "another comment",
                    "another one"
                ]
            },
            {
                id: 2,
                text: 'Nothing went well, etc.',
                upVotes: 1,
                downVotes: 0,
                comments: [
                    "Only one comment"
                ]
            },
        ],

        actionItems: [
            {
                id: 1,
                text: 'Let\'s try something else.',
                upVotes: 3,
                downVotes: 0,
                comments: []
            },
            {
                id: 2,
                text: 'More quests.',
                upVotes: 4,
                downVotes: 3,
                comments: []
            },
            {
                id: 3,
                text: 'More hackathons.',
                upVotes: 1,
                downVotes: 0,
                comments: []
            },
        ],
    };
    res.status(200).json(retro);
});

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
    });
}

module.exports = app;