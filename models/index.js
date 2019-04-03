'use strict';
var Sequelize = require('sequelize');

const sequelize = new Sequelize('Occupied', process.env.PGUSER, process.env.PGPASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

/*
* import all the models from the folder
*/
const db = {
  User: sequelize.import('./user.js'),
  Blueprint: sequelize.import('./blueprint.js'),
  Space: sequelize.import('./space.js'),
}

/*
* validate the database connection
*/
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// associate all the models in the database 
Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;