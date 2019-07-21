const router = require('express').Router();
const _ = require('lodash');
const { Blueprint, User, Space, Visit } = require('../models');
const { Op } = require('sequelize');

//TODO: Group this into a util function folder
//Error handler
const errorHandler = (err, models) => {
  if (err instanceof models.sequelize.ValidationError){
    //use lodash to pick between the key-value pairs in the object
    return err.errors.map(x => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'blueprint', message: 'Unknown Error' }];
}

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

router.get('/public', async (req, res) => {
  try {
    const publicBlueprints = await Blueprint.findAll({
      where: {
        isPublic: true
      },
      include: [{
        model: User
      }, {
        model: Space
      }]
    });
    res.send(publicBlueprints);
  } catch (err) {
    console.error(err)
    res.sendStatus(404);
  }
})

/**
  Get's multiple blueprint information by query params
*/
router.get('/query', async (req, res) => {
  const { name, description, category, size, public } = req.query;
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
            },
          ]
        },
      }, {
        include: [{
          model: User
        }]
      })
    } else {
      foundBps = await Blueprint.findAll({
        include: [{
          model: User
        }, {
          model: Space
        }]
      });
    }
    res.send(foundBps)
  } catch (err) {
    console.error(err);
  }
})

//joins a blueprint
router.post('/join/', async(req, res) => {
  const { blueprintId, userId } = req.body;
  try {
    const foundUser = await User.findOne({
      where: {
        id: userId
      }
    });
    const foundBlueprint = await Blueprint.findOne({
      where: {
        id: blueprintId
      }
    });
    if (foundUser && foundBlueprint) {
      try {
        await foundBlueprint.addUser(foundUser);
        res.sendStatus(201);
      } catch (err) {
        throw err;
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.error(err);
    res.status(404).send(err);
  }
});

// only the owner of 
router.post('/invite/', async(req, res) => {
  const { ownerId, blueprintId, userId, username } = req.body;
  console.log('req.body')
  console.log(req.body)
  try {
    const foundUser = await User.findOne({
      where: {
        [Op.or]: [{id: userId}, {username}]
      }
    });
    console.log('foundUser')
    console.log(foundUser)
    const foundBlueprint = await Blueprint.findOne({
      where: {
        id: blueprintId
      }
    });
    console.log('foundBlueprint')
    console.log(foundBlueprint)
    // makes sure that the blueprint and user exists first
    if (foundUser && foundBlueprint) {
      //makes sure that the person inviting is the owner
      if (foundBlueprint.dataValues.userId === parseInt(ownerId)) {
        await foundBlueprint.addUser(foundUser);
        res.sendStatus(201);
      } else {
        res.status(401).send('Error: you are not the owner!');
      }
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.status(404).send(err);
  }
});

/*
 * a POST request to create a Blueprint in the database. This requires the user to be logged in
 * @params: {userId, username, name, description, address, category, imageUrl, isPublic}
 * @output: a JSON is sent in the following format
 * 
 * ------------------------ RESPONSE SCHEMATIC ----------------------------
 * 
 * {
 *   created: boolean,
 *   errors: [
 *     {
 *       path: String or null,
 *       message: String or null
 *     }
 *   ]
 * }
 * 
 * 
 */
router.post('/create', async (req, res, next) => {
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
      try{
        // get all the Blueprints associated with this user
        const presentAssociations = await found.getBlueprints();
        //iterate over array
        for (var i = 0, len = presentAssociations.length; i < len; i++) {
          if (presentAssociations[i].name == name){
            console.log('One already exists');            
            res.json({ created: false, errors: [{ path: 'blueprint', message: 'Duplicate'}]}).send();
            //handle back control to the main router instance
            return;
          }
        }
        const newBlueprint = await Blueprint.create({
          name, description, category, imageUrl, isPublic, address
        })
        const adminPromise = found.addBlueprint(newBlueprint);
        const memberPromise = newBlueprint.addUser(found);
        const response = {
          created: true,
          errors: [{path: null, message: null}]
        }
        res.json(response);
        await adminPromise;
        await memberPromise;
      }
      catch (error){
        const resObject = {
          created: false,
          errors: errorHandler(error, Blueprint),
        }
        res.json(resObject);
      }
    } else {
      const response = {
        created: false,
        errors: [{ path: 'user', message: 'User not found'}]
      };
      res.json(response);
    }
  } catch (err) {
    console.error(err);
    const resObject = {
      created: false,
      errors: [{ path: 'database', message: 'Unknown database error' }],
    }
    res.json(resObject);
  }
})

router.post('/edit/', async (req, res) => {
  const { blueprintId, userId, name, description, address, category, imageUrl, isPublic } = req.body;
  try {
    const foundBlueprint = await Blueprint.findOne({ where: { id: blueprintId }});
    if (foundBlueprint.userId === userId) {
      foundBlueprint.update({ name, description, address, category, imageUrl, isPublic });
      res.send(201)
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(404);
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

/** 
  Get's blueprint information by ID
 */
router.get('/:id', async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    const found = await Blueprint.findOne({
      where: { id },
      include: [{
        model: User
      }, {
        model: Space
      }, {
        model: Visit
      }]
    });
    if (found) {
      res.send(found);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
})

module.exports = router;