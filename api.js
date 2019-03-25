const router = require('express').Router();
const db = require('./config/db');
const User = require('./models/User');
// const Blueprint = require('./models/Blueprint');
// const Space = require('./models/Space');
const Sequelize = require('sequelize');

router.get('/users', async(req, res) => {
  const users = await User.findAll();
  res.send(users);
})

route.post('/login/', async(req, res) => {

})

module.exports = router;