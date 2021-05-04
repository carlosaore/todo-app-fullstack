const app = require('./app');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) {
        throw new Error(`An error occurred: ${err.message}`);
    }
    console.log(`Server is listening on ${port}`);
});