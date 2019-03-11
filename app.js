const express = require('express');
const db = require('./config/db');

const app = express();

app.get('/', (req, res) => {
    res.send(process.env.PGUSER);
})

const port = 5000;

app.listen(port, () => console.log('listening on 5000'));