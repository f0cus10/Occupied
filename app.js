const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
app.use('/api', require('./api'));
db.sequelize.sync({ force: true }).then(() => console.log('synced!'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
    res.send(process.env.PGUSER);
})



const port = 5000;

app.listen(port, () => console.log('listening on 5000'));