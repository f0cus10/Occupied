const router = require('express').Router();
const { Blueprint } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const blueprints = await Blueprint.findAll();
    res.send(blueprints);
  } catch (err) {
    console.error(err);
  }
})

router.post('/create', async (req, res) => {
  const { userId, name, description } = req.body;
})

router.get('/delete/:id', async (req, res) => {
  // const { id } = req.params;
  // try {
    // const users = await User.destroy()
  // }
})

module.exports = router;