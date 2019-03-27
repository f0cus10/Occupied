const router = require('express').Router();
const { sequelize } = require('./models/');
// const User = require('./models').User;
// const Blueprint = require('./models').Blueprint;
// const Space = require('./models').Space;
const Sequelize = require('sequelize');

router.get('/users', async(req, res) => {
  const users = await User.findAll();
  res.send(users);
})

router.post('/login/', async(req, res) => {
  res.send(404);
})

module.exports = router;