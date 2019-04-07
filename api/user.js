const router = require('express').Router();
const { User } = require('../models');
const { Op } = require('sequelize');

router.get('/all', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
})

/**
  Gets username information by query params
 */
router.get('/query', async(req, res) => {
  const { username, description, usageTime } = req.query;
  try {
    const found = await User.findOne({
      where: {
        [Op.or]: [{username}, {description}, {usageTime}]
      }
    });
    if (found) {
      const foundBp = await found.getBlueprints();
      if (foundBp.length > 0) {
        found.dataValues.blueprints = foundBp
        res.send(found);
      }
      res.send(found);
    } else {
      res.status(404).send("Not found.");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
})

/**
  Get's username information by id
 */
router.get('/:id', async(req, res) => {
  const { id } = req.params;
  try {
    const found = await User.findOne({
      where: {
        id
      }
    });
    if (found) {
      res.send(found);
    } else {
      res.status(404).send("Not found.");
    }
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
    res.sendStatus(202);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
})

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await User.destroy({
      where: {
        id
      }
    })
    if (response) {
      res.sendStatus(201)
    }
  } catch (err) {
    console.error(err);
  }
})

module.exports = router;