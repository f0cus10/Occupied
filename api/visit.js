const router = require('express').Router();
const { Visit, User, Blueprint, Space } = require('../models');
const { Op } = require('sequelize');
const { format } = require('date-fns');

// Gets everybody
router.get('/all', async (req, res, next) => {
  const { decoded } = req;
  console.log(decoded)
  try {
    const visits = await Visit.findAll({
      include: [{
        model: User
      }, {
        model: Space
      }]
    });
    res.send(visits);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
})

/**
  Create's a new visit entry
 */
router.post('/create', async (req, res) => {
  const { from, to, blueprintId, userId, spaceId } = req.body;
  try {
    const foundBlueprint = await Blueprint.findOne({ where: { id: blueprintId } });
    const foundUser = await User.findOne({ where : { id : userId } });
    const foundSpace = await Space.findOne({ where : { id : spaceId }});
    if (foundBlueprint && foundUser && foundSpace) {
      const newVisit = await visit.create({ from, to });
      await foundBlueprint.addVisit(newVisit);
      newVisit.addBlueprint(foundBlueprint);
      newVisit.addBlueprint(foundUser);
      newVisit.addBlueprint(foundSpace);
      res.sendStatus(201);
    } else {
      res.status(404).send('visit error');
    }
  } catch (err) {
    console.error(err);
  }
})

module.exports = router;
