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
});

User.associate = (models) => {
  //Blueprints the user is an admin of
  User.hasMany(models.Blueprint, {
    //foreignKey is going to be on blueprint and point to User
    foreignKey: 'adminID',
  });
  
  User.hasMany(models.Space, {
    foreignKey: 'occupierID',
  });
}

module.exports = User;