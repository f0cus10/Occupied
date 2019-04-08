const router = require('express').Router();
const { Blueprint, User, Space } = require('../models');
const { Op } = require('sequelize');

router.get('/all', async (req, res, next) => {
  try {
    const blueprints = await Blueprint.findAll({
      include: [{
        model: User
      }, {
        model: Space
      }]
    });
    res.send(blueprints);
  } catch (err) {
    console.error(err);
    res.send(404);
  }
})

/**
  Get's multiple blueprint information by query params
*/
router.get('/query', async (req, res) => {
  const { name, description, category, size } = req.query;
  try {
    let foundBps;
    if (name || description || category) {
      foundBps = await Blueprint.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `${name}%`
              },
            },
            {
              description: {
                [Op.iLike]: `${description}%`
              },
            },
            {
              category: {
                [Op.iLike]: `${category}%`
              }
            }
          ]
        },
      }, {
        include: [{
          model: User
        }]
      })
    } else {
      foundBps = await Blueprint.findAll();
    }
    res.send(foundBps)
  } catch (err) {
    console.error(err);
  }
})

/** 
  Get's blueprint information by ID
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const found = await Blueprint.findOne({
      where: {
        id
      }
    }, {
      include: [{
        model: Blueprint
      }]
    })
  } catch (err) {
    console.error(err);
  }
})

// only the owner of 
router.post('/invite', async(req, res) => {
  const { ownerId, blueprintId, userId, username } = req.body;
  try {
    const foundUser = await User.findOne({
      where: {
        [Op.or]: [{id: userId}, {username}]
      }
    });
    const foundBlueprint = await Blueprint.findOne({
      where: {
        id: blueprintId
      }
    });
    // makes sure that the blueprint and user exists first
    if (foundUser && foundBlueprint) {
      //makes sure that the person inviting is the owner
      if (foundBlueprint.dataValues.userId === parseInt(ownerId)) {
        await foundBlueprint.addUser(foundUser);
        res.sendStatus(201);
      } else {
        res.sendStatus(404)
      }
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.status(404).send(err);
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
    res.sendStatus(404);
  }
})

router.post('/create', async (req, res) => {
  let {
    userId,
    username,
    name, 
    description,
    address,
    category, 
    imageUrl,
    isPublic
  } = req.body;
  try {
    const found = await User.findOne({
      where: {
        [Op.or] : [{id: userId}, {username}]
      }
    });
    if (found) {
      const newBlueprint = await Blueprint.create({
        name, description, category, imageUrl, isPublic, address
      })
      await found.addBlueprint(newBlueprint);
      await newBlueprint.addUser(found);
      res.sendStatus(201);
    } else {
      res.send(404);
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