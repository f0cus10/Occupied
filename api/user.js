const router = require('express').Router();
const { User } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    console.error(err);
  }
})

router.get('/delete/:id', async (req, res) => {
  // const { id } = req.params;
  // try {
    // const users = await User.destroy()
  // }
})

module.exports = router;