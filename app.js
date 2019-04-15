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

//populates users and creates associations
(async () => {
    try {
        setTimeout(async () => {
            const users = await User.bulkCreate(dummyUsers);
            const blueprints = await Blueprint.bulkCreate(dummyBlueprints);
            const { userToBlueprint, blueprintToSpace, userToSpace } = dummyAssociations;
            for (let a of userToBlueprint) {
                const { user, blueprint } = a;
                const foundUser = await User.findOne({ where: { username: user }});
                const foundBp = await Blueprint.findOne({ where: { name: blueprint }});
                if (foundUser || foundBp) {
                    foundBp.addUser(foundUser);
                    foundUser.addBlueprint(foundBp);
                } else {
                    throw 'assocation failed';
                }
            }
            for (let a of blueprintToSpace) {
                const { user, blueprint } = a;
                const foundUser = await User.findOne({ where: { username: user }});
                const foundBp = await Blueprint.findOne({ where: { name: blueprint }});
                if (foundUser || foundBp) {
                    foundBp.addUser(foundUser);
                    foundUser.addBlueprint(foundBp);
                } else {
                    throw 'assocation failed';
                }
            }
        }, 1000)
        console.log('bulk creation finished')
    } catch (err) {
        console.error(err);
    }
})();

const port = 5000;

app.listen(port, () => console.log('listening on 5000'));