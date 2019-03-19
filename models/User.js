const db = require('../config/db');
const Sequelize = require('sequelize');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = User;