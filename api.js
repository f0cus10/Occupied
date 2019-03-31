const router = require('express').Router();
const { User, Blueprint, Space } = require('./models');

router.get('/users', async(req, res) => {
  const users = await User.findAll();
  res.send(users);
})

router.post('/login/', async(req, res) => {
  res.send(404);
})

module.exports = router;