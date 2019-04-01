const router = require('express').Router();
const { User } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
})

router.post('/usage', async (req, res) => {
  const { id, usageTime } = req.body;
  try {
    const user = await User.find({
      where: { id }
    });
    if (user) {
      user.update({ usageTime })
    }
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
})

router.get('/delete/:id', async (req, res) => {
  // const { id } = req.params;
  // try {
    // const users = await User.destroy()
  // }
})

module.exports = router;