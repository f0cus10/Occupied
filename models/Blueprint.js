//this is going to follow the same model as the user
const db = require ('../config/db');
const Sequelize = require('sequelize');

/* 
* Blueprints are the highest level reservation space container
* they themselves cannot be reserved but contain _spaces_ that can be reserved
*/

const Blueprint = db.define('blueprint', {
  //unique id for identification
  blueprint_id: {
    type: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
    autoIncrement: false
  },
  //The blueprint also has a name
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Blueprint;