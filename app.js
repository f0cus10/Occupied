const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models');
const { User, Blueprint, Space, Visit } = require('./models');
const dummyUsers = require('./dummy/users.json');
const dummyBlueprints = require('./dummy/blueprints.json');
const dummySpaces = require('./dummy/spaces.json');
const dummyVisits = require('./dummy/visits.json');
const dummyAssociations = require('./dummy/associations.json');
require('dotenv').config();

const app = express();
db.sequelize.sync({ force: true }).then(() => console.log('synced!'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', require('./api'));

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

//populates users and creates associations
(async () => {
    try {
        setTimeout(async () => {
            const users = await User.bulkCreate(dummyUsers);
            const blueprints = await Blueprint.bulkCreate(dummyBlueprints);
            const spaces = await Space.bulkCreate(dummySpaces);
            const visits = await Visit.bulkCreate(dummyVisits);

            const { userToBlueprint, blueprintToSpace, userToSpace } = dummyAssociations;
            for (let a of userToBlueprint) {
                const { user, blueprint } = a;
                console.log('user')
                console.log(user)
                console.log('blueprint')
                console.log(blueprint)
                const foundUser = await User.findOne({ where: { username: user }});
                const foundBp = await Blueprint.findOne({ where: { name: blueprint }});
                if (foundUser || foundBp) {
                    // foundBp.addUser(foundUser);
                    foundBp.addUser(foundUser, {
                        through    : 'member',
                        foreignKey : 'blueprintId'
                    });
                    foundUser.addBlueprint(foundBp, { through: 'member' });
                } else {
                    throw 'assocation failed';
                }
            }
            for (let a of blueprintToSpace) {
                const { blueprint, space } = a;
                const foundBp = await Blueprint.findOne({ where: { name: blueprint }});
                const foundSpace = await Space.findOne({ where: { name: space }});
                if (foundSpace || foundBp) {
                    foundBp.addSpace(foundSpace);
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

var PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on ${PORT}`));