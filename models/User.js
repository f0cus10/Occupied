const db = require('../config/db');
const Sequelize = require('sequelize');

/**
 * Users can be creators of certain blueprints
 */
const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },

  // Array of blueprints users are admins of 
  AdminsOf: {
    type: Sequelize.ARRAY,
  }
})

module.exports = User;