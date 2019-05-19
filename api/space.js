const router = require('express').Router();
const _ = require('lodash');
const { Space, User, Blueprint, Visit } = require('../models');
const { Op } = require('sequelize');


//TODO: Group this into a util function as well
//Error Handler Helper function
const errorHandler = (err, models) => {
  if (err instanceof models.sequelize.ValidationError){
    //use lodash to pick between the key-value pairs in the object
    return err.errors.map(x => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'Space', message: 'Unknown Error'}];
}

/**
 * @param spaceID
 * @returns [Space, Blueprint]
 */
async function findBlueprint(spaceID){
  // find the space through an async call
  const space = await Space.findOne({
    where: {
      id: spaceID,
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
    res.status(404).json({
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
      if (values[0] == null){
        res.json({
          occupied: false,
          message: "Space already occupied"
        })
      }
      // values = [Blueprint, User]
      const result = await values[0].hasUser(values[1]);
      if (result){
        const updatePromise = Space.update({ occupiedStart: new Date(), occupied: true, userId: values[1].dataValues.id }, {where: {id : spaceId, occupied: false }});
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
        const thisSpace = await Space.findOne({ where : { id : spaceId }});
        const newVisit = await Visit.create({
          from: thisSpace.dataValues.occupiedStart,
          to: new Date(),
          blueprintId: values[0].dataValues.id,
          spaceId: thisSpace.dataValues.id,
          userId: values[1].dataValues.id
        });
        const updatePromise = await Space.update({ occupied: false, userId: null, occupiedStart: null }, {where: {id: spaceId }});
        res.json({
          occupied: false,
          message: "Successfully Unoccupied",
        })
        await updatePromise;
      }
    })
  } catch (err) {
    console.log(err);
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


/*
 *
 * a POST request to create a Space in the database.
 * @reqs: logged in user, opened blueprint
 * @returns: a JSON is sent in the following format
 * 
 * ------------------------------ RESPONSE SCHEMATIC ----------------------
 * 
 * {
 *    created: boolean,
 *    errors: [
 *      {
 *        path: String or null
 *        message: String or null
 *      }
 *    ]
 * }
 */

router.post('/create', async(req, res) => {
  let {
    name,
    blueprintId,
    blueprintName,
    description,
    category,
    imageUrl
  } = req.body;

  try{
    const foundBlueprint = await Blueprint.findOne({
      where: {
        [Op.or]: [{ id: blueprintId }, {name: blueprintName}]
      }
    });
    if (foundBlueprint){
      try{
        const newSpace = await Space.create({
          name, description, imageUrl, category
        })
        const BlueprintToSpacePromise = foundBlueprint.addSpace(newSpace);
        const response = {
          created: true,
          errors: [{ path: null, message: null}]
        }
        res.json(response);
        await BlueprintToSpacePromise;
      }
      catch (err){
        //Creating the space was unsuccessful 
        const resObject = {
          created: false,
          errors: errorHandler(error, Space),
        }
        res.json(resObject);
      }
    } else {
      //the blueprint was not found
      const response = {
        created: false,
        errors: [{ path: 'Blueprint', message: 'Blueprint not found'}]
      }
      res.json(response);
    }
  }
  catch (err){
    console.error(err);
    const resObject = {
      created: false,
      errors: [{ path: 'Database', message: 'Unknown database error'}]
    }
    res.json(resObject);
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