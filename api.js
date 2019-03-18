const router = require('express').Router();
const db = require('./config/db');
const User = require('./models/User');
const Sequelize = require('sequelize');

router.get('/users', async(req, res) => {
  const users = await User.findAll();
  res.send(users);
})

module.exports = router;