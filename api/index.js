const router = require('express').Router();
const dummyUsers = require('../dummy/users.json');
const dummyBlueprints = require('../dummy/blueprints.json');
const { User, Blueprint, Space } = require('../models');

router.use('/user', require('./user'));
router.use('/blueprint', require('./blueprint'));
router.use('/space', require('./space'));
router.use(require('./authenticate'));

router.get('/populate', async (req, res, next) => {
  try {
    const users = await User.bulkCreate(dummyUsers);
    const blueprints = await Blueprint.bulkCreate(dummyBlueprints);
    res.status(201).send("Populate complete");
  } catch (err) {
    res.sendStatus(404);
  }
})

router.post('/login/', async(req, res) => {
  res.send(404);
})

module.exports = router;