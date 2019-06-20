'use strict';
var Sequelize = require('sequelize');

let sequelize;

//If the app is running in production, connect to database differently
if (process.env.NODE_ENV === 'production'){
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgresql',
    logging: true,
  })
}
//Else use development database settings
else {
  sequelize = new Sequelize(process.env.PGNAME, process.env.PGUSERNAME, process.env.PGPASSWORD, {
    dialect: 'postgresql',
    port: process.env.PGPORT,
  })
}

/*
* import all the models from the folder
*/
const db = {
  User: sequelize.import('./user.js'),
  Blueprint: sequelize.import('./blueprint.js'),
  Space: sequelize.import('./space.js'),
  Visit: sequelize.import('./visit.js')
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