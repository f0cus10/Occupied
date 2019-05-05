'use strict';
var pg = require('pg');
pg.defaults.ssl = true;

var Sequelize = require('sequelize');

const sequelize = new Sequelize('defaultdb', 'doadmin', process.env.PGPASSWORD, {
  host: process.env.DB_URL,
  dialect: 'postgresql',
  dialectOptions: { "ssl": {"require":true } },
  port: 25060,
  ssl: true
});

/*
* import all the models from the folder
*/
const db = {
  User: sequelize.import('./user.js'),
  Blueprint: sequelize.import('./blueprint.js'),
  Space: sequelize.import('./space.js')
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