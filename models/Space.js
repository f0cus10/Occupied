const db = require('../config/db');
const Sequelize = require('sequelize');

/*
* Spaces are the reservable elements of blueprints
* this is the main feature of the application and this is the one that changes everything
*
*/

const Space = db.define('Space', {
  //unique id for identification
  space_id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    autoIncorrect: false
  },

  // for example, "Piano room"
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      allowNull: false
    }
  },

  // Has a room number, but it doesn't have to be an integer
  space_number: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true,
      allowNull: false
    }
  },
  
  occupied: {
    type: Sequelize.BOOLEAN,
    //by default this is not occupied
    defaultValue: false,
    allowNull: false
  }
})

module.exports = Space;