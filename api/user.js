const router = require('express').Router();
const { User, Blueprint, Space } = require('../models');
const { Op } = require('sequelize');

// Gets everybody
router.get('/all', async (req, res, next) => {
  const { decoded } = req;
  console.log(decoded)
  try {
    const users = await User.findAll({
      include: [{
        model: Blueprint
      }, {
        model: Space
      }]
    });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
})

/**
  Gets username information from currently logged in user solely from their JWT token
 */
router.get('/', async (req, res) => {
  const { username } = req.decoded;
  try {
    const found = await User.findOne({
      where: { username },
      include: [{
        model: Blueprint
      }, {
        model: Space
      }]
    })
    const categories = found.blueprints.map(m => m.category).filter((val, idx, arr) => arr.indexOf(val) === idx);
    found.dataValues.categories = categories;
    res.send(found);
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
      },
      include: [{
        model: Blueprint
      }, {
        model: Space
      }]
    });
    res.send(found);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
})

/**
  Get's username information by id
 */
router.get('/id/:id', async(req, res) => {
  const { id } = req.params;
  try {
    const found = await User.findOne({
      where: {
        id
      },
      include: [{
        model: Blueprint
      }, {
        model: Space
      }]
    });
    if (found) {
      foundBp = await found.getBlueprints();
      console.log('foundBp')
      console.log(foundBp)
      found.dataValues.blueprints = foundBp;
      res.send(found);
    } else {
      res.status(404).send("Not found.");;
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
})

/**
  Updates usage time
 */
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

router.post('/delete/:id', async (req, res) => {
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