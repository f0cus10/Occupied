const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
app.use('/api', require('./api'));
db.sync().then(() => console.log('synced!'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
    res.send(process.env.PGUSER);
})

// Populates the db with dummy data
app.get('/populate', async (req, res) => {
})

const port = 5000;

app.listen(port, () => console.log('listening on 5000'));