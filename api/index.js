const router = require('express').Router();
const ProtectedRoutes = require('express').Router();
const jwt = require('jsonwebtoken');
const dummyUsers = require('../dummy/users.json');
const dummyBlueprints = require('../dummy/blueprints.json');
const { User, Blueprint, Space } = require('../models');


ProtectedRoutes.use((req, res, next) => {
  //check header for the token
  var token = req.headers['access-token'];
  if(token){
    jwt.verify(token, require('./config').secret, (err, decoded) => {
      if (err){
        return res.json({ message: 'Invalid Token' });
      }
      else{
        req.decoded = decoded;
        next();
      }
    }) 
  }
  else {
    res.redirect(400, '/');
  }
});

router.use('/user', ProtectedRoutes, require('./user'));
router.use('/blueprint', ProtectedRoutes, require('./blueprint'));
router.use('/space', ProtectedRoutes, require('./space'));
router.use(require('./authenticate'));

router.get('/populate', async (req, res, next) => {
  try {
    const users = await User.bulkCreate(dummyUsers);
    const blueprints = await Blueprint.bulkCreate(dummyBlueprints);
    res.status(201).send("Populate complete");
  } catch (err) {
    res.sendStatus(404);
  }
})

router.post('/login/', async(req, res) => {
  res.send(404);
})

module.exports = router;