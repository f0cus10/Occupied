const router = require('express').Router();
const { Space, User, Blueprint } = require('../models');
const { Op } = require('sequelize');

/**
  * @param {boolean} occupied - the occupied status
  * @returns status 201 or 404
  */
 // todo: first check if the user is a member of that blueprint space
router.post('/occupy', async (req, res, next) => {
  const { userId, spaceId, occupied } = req.body;
  try {
    const foundUser = User.findOne({
      where: {
        id: userId
      }
    });
    const foundSpace = Space.findOne({
      where: {
        id: spaceId
      }
    });
    if (foundUser && foundSpace) {
      await Space.update({ occupied, userId }, { where: { id: spaceId }});
      res.sendStatus(201);
    } else {
      res.status(404).send('can\'t find user or space')
    }
  } catch (err) {
    console.error(err);
  }
})

/**
 * @param spaceID
 * @returns {Space}
 */
async function findBlueprint(spaceID){
  // find the space through an async call
  const space = await Space.findOne({
    where: {
      space_id: spaceID,
    }
  })
  //return null if not found
  if (!space){
    return null;
  }
  //wait for the blueprint
  const blueprint = await space.getBlueprint();
  return blueprint;
}

/**
 * @param {username}
 * @returns {User}
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
    const blueprint = findBlueprint(spaceId); //async call
    const user = findUser(username);
    await blueprint;
    await user;
  } catch{
    res.json({
      occupied: false,
      message: "Unknown Error",
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