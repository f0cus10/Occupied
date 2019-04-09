const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const { User, Blueprint } = require('./models');
const dummyUsers = require('./dummy/users.json');
const dummyBlueprints = require('./dummy/blueprints.json');
const dummyAssociations = require('./dummy/associations.json');

const app = express();
db.sequelize.sync({ force: true }).then(() => console.log('synced!'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', require('./api'));

app.get('/', (req, res) => {
    res.send(process.env.PGUSER);
});

(async () => {
    try {
        setTimeout(async () => {
            const users = await User.bulkCreate(dummyUsers);
            const blueprints = await Blueprint.bulkCreate(dummyBlueprints);
            const hunter = await Blueprint.create({
                "name": "Hunter College",
                "category": "School",
                "description": "the best cuny probably",
                "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Hunter_College.jpg/215px-Hunter_College.jpg",
                "isPublic": true,
            });
            const linda = await User.create({
                username: "linda liang",
                description: "whoa"
            });
            const n = await Blueprint.findOne({ where: { id: 2}});
            const miguel = await User.findOne({ where: { username: "miguel"} })
            hunter.setUser(miguel);
            n.setUser(miguel);
            hunter.addUser(miguel);
        }, 1000)
        console.log('bulk creation finished')
    } catch (err) {
        console.error(err);
    }
})();

const port = 5000;

app.listen(port, () => console.log('listening on 5000'));