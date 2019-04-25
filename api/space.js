const router = require('express').Router();
const { Space, User, Blueprint } = require('../models');
const { Op } = require('sequelize');

/**
 * @param spaceID
 * @returns [Space, Blueprint]
 */
async function findBlueprint(spaceID){
  // find the space through an async call
  const space = await Space.findOne({
    where: {
      space_id: spaceID,
    }
  })
  //wait for the blueprint
  const blueprint = await space.getBlueprint();
  return blueprint;
}

/**
 * @param username
 * @returns User
 */
async function findUser(username){
  const user = await User.findOne({
    where: {
      username
    }
  })

  return user;
}

/**
 * @param HTTP Request with the space id in the request body
 * @returns {occupied: Boolean, message: null or String}  
 */
router.post('/occupy', async(req, res) => {
  const { spaceId } = req.body;
  const { username } = req.decoded;
  //validate inputs
  if (!spaceId || !username) {
    res.json({
      occupied: false,
      message: "Incomplete input",
    })
  }
  try{
    Promise.all([
      findBlueprint(spaceId),
      findUser(username)
    ])
    .then(async (values) => {
      //TODO: null check
      // values = [Blueprint, User]
      const result = await values[0].hasUser(values[1]);
      if (result){
        const updatePromise = Space.update({ occupied: true, userId: values[1].id }, {where: {space_id: spaceId }});
        res.json({
          occupied: true,
          message: "Successfully Occupied",
        })
        await updatePromise;
      }
    })
  } catch (err) {
    res.statusCode(404).json({
      occupied: false,
      message: err,
    })
  }
})

/**
 * This endpoint is called when the user is finished occupying a space
 * @param HTTP Request with the space id in the request body
 * @returns {occupied: Boolean, message: null or String}  
 */
router.post('/finished', async (req, res) => {
  const { spaceId } = req.body;
  const { username } = req.decoded;
  if (!spaceId || !username) {
    res.json({
      occupied: false,
      message: "Incomplete input",
    })
  }
  try{
    Promise.all([
      findBlueprint(spaceId),
      findUser(username)
    ])
    .then(async (values) => {
      //TODO: null check
      // values = [Blueprint, User]
      const result = await values[0].hasUser(values[1]);
      if (result){
        const updatePromise = Space.update({ occupied: false, userId: null }, {where: {space_id: spaceId }});
        res.json({
          occupied: false,
          message: "Successfully Unoccupied",
        })
        await updatePromise;
      }
    })
  } catch (err) {
    res.statusCode(404).json({
      occupied: true,
      message: err,
    })
  }
})

/**
  Get's all spaces
 */
router.get('/all', async (req, res, next) => {
  try {
    const spaces = await Space.findAll();
    res.send(spaces);
  } catch (err) {
    console.error(err);
  }
})

/**
  Get's spaces by id
 */
router.get('/:spacesId', async (req, res) => {
  try {
    const found = await Space.findOne({
      where: {
        id
      }
    }, {
      include: [{
        model: Usr
      }]
    });
    if (found) {
      res.send(found)
    } else {
      res.status(404).send("Not found.");
    }
  } catch (err) {
    console.error(err);
    res.status(404).send(err);
  }
});

/**
  Create's new space and associates it to a blueprint and user.
 */
router.post('/create', async (req, res) => {
  const { name, blueprintId, blueprintName, description } = req.body;
  try {
    const foundBlueprint = await Blueprint.findOne({
      where: {
        [Op.or]: [{id: blueprintId}, {name: blueprintName}]
      }
    });
    if (foundBlueprint) {
      const newSpace = await Space.create({
        name, description
      })
      await foundBlueprint.addSpace(newSpace)
      res.sendStatus(201);
    } else {
      res.status(404).send('Cannot associate blueprint to this space!')
    }
  } catch (err) {
    console.error(err);
  }
})

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Space.destroy({
      where: {
        id
      }
    })
    if (response) {
      res.sendStatus(201);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
})

module.exports = router;