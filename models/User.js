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

  associate: (models) => {
    //Blue prints the user is an admin of
    User.hasMany(models.Blueprint, {
      foreignKey: 'ownedBlueID',
    });
  },
});

module.exports = User;