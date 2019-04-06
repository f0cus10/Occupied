const router = require('express').Router();
const { Space } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const spaces = await Space.findAll();
    res.send(spaces);
  } catch (err) {
    console.error(err);
  }
})

router.get('/:spacesId', async (req, res) => {

});

router.get('/delete/:id', async (req, res) => {
  // const { id } = req.params;
  // try {
    // const users = await User.destroy()
  // }
})

module.exports = router;