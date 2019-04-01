const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const { User, Blueprint } = require('./models');
const dummyUsers = require('./dummy/users.json');
const dummyBlueprints = require('./dummy/blueprints.json');

const app = express();
app.use('/api', require('./api'));
db.sequelize.sync({ force: true }).then(() => console.log('synced!'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
    res.send(process.env.PGUSER);
});

(async () => {
    try {
        setTimeout(async () => {
            const users = await User.bulkCreate(dummyUsers);
            const blueprints = await Blueprint.bulkCreate(dummyBlueprints);
        }, 1000)
        console.log('bulk creation finished')
    } catch (err) {
        console.error(err);
    }
})();

const port = 5000;

app.listen(port, () => console.log('listening on 5000'));