'use strict';
const router = require('express').Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { User } = require('../models');

//read the keys
const privateKEY = fs.readFileSync('./private.key', 'utf8');

//Error handler
const errorHandler = (err, models) => {
  if (err instanceof models.sequelize.ValidationError){
    //use lodash to pick between the key-value pairs in the object
    return err.errors.map(x => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'authorization', message: 'Unknown Error' }];
}

/*
 *
 * a POST request to create a user in the database. This requires username and password from the http request
 * @input: username, password 
 * @output: token
 * @modify: add database entry
 * 
 */
router.post('/signup', async (req, res) => {
  //null check
  if (req.body.username && req.body.password){
    //check database for username
    try{
      const found = await User.findOne({
        where: {
          username: req.body.username,
        }
      });
      //if (user) respond user found
      if (found){
        console.log(found.get({ plain: true }));
        res.status(409).json({ message: "Username already exists" });
      }
      else{
        //create the user with the password
        //TODO: add more options to the user
        try{
          const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            description: req.body.description,
          });
          console.log(newUser.get({plain: true}));
          const response = {
            registered: true
          }
          res.status(201).json(response);
        }
        catch (err){
          //There has been an error
          const response = {
            registered: false,
            errors: errorHandler(err, User),
          }
          res.status(401).json(response);
        } 
      }
    }
    catch (err){
      console.log(err);
      res.status(400).json({ message: "Database error" });
    }
  }
  else {
    //no username or password
    res.status(400).json({ message: "Missing username or password" });
  }
})

/**
 * @returns the jwt token as a string.
 */
router.post('/login', async(req, res) => {
  try{
    const foundUser = await User.findOne({
      where:{
        username: req.body.username
      }
    });
    if(!foundUser){
      //user not found
      res.status(401).json({ message: "Authentication Failed" });
    }
    else if (foundUser){
      //check for password
      try{
        const match = await foundUser.validPassword(req.body.password);
        if(!match){
          res.status(401).json({ message: "Authentication failed" });
        }
        else{
          //issue a token
          //generate the token
          const payload = {
            username: foundUser.username,
            loggedIn: true,
          }

          const i = 'Occupied';

          var signOptions = {
            issuer: i,
            expiresIn: "12h",
            algorithm: "RS256"
          };

          const token = jwt.sign(payload, privateKEY, signOptions);
          console.log("Token - " + token);
          res.status(201).json({ message: "Successfully logged in", token});
        }
      }
      catch (err){
        throw err;
      }
    }
  }
  catch (err) {
    throw err;
  }
})

module.exports = router;