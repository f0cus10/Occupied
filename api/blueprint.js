const router = require('express').Router();
const { Blueprint } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const blueprints = await Blueprint.findAll();
    res.send(blueprints);
  } catch (err) {
    console.error(err);
    res.send(404);
  }
})

router.get('/public', async (req, res) => {
  try {
    const publicBlueprints = await Blueprint.findAll({
      where: {
        isPublic: true
      }
    });
    res.send(publicBlueprints);
  } catch (err) {
    console.error(err)
    res.send(404);
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