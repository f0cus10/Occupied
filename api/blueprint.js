const router = require('express').Router();
const { Blueprint, User } = require('../models');
const { Op } = require('sequelize');

router.get('/all', async (req, res, next) => {
  try {
    const blueprints = await Blueprint.findAll();
    res.send(blueprints);
  } catch (err) {
    console.error(err);
    res.send(404);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const found = await Blueprint.findOne({
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
  let { userId, username, name, description, category, imageUrl, isPublic } = req.body;
  try {
    const found = await User.findOne({
      where: {
        [Op.or] : [{id: userId}, {username}]
      }
    });
    if (found) {
      const newBlueprint = await Blueprint.create({
        name, description, category, imageUrl, isPublic
      })
      await found.addBlueprint(newBlueprint)
      res.sendStatus(201);
    } else {
      await Blueprint.create({
        name, description, category, imageUrl, isPublic
      })
      res.sendStatus(201);
    }
  } catch (err) {
    console.error(err);
  }
})

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Blueprint.destroy({
      where: {
        id
      }
    });
    if (deleted) {
      res.send(201);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
})

module.exports = router;