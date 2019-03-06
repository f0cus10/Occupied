const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hello');
})

const port = 5000;

app.listen(port, () => console.log('listening on 5000'));