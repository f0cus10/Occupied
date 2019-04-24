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
 * @output: a JSON is sent in the following format
 * 
 * 
 * -------------------------- RESPONSE SCHEMATIC -------------------------------------------
 * 
 * {
 *   registered: Bool,
 *   errors: [
 *     {
 *       path: String or null,
 *       message: String or null
 *     }
 *   ],
 * }
 * 
 * ------------------------------------------------------------------------------------------
 * 
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
        //edit standard error
        const resObject = {
          registered: false,
          errors: [{path: "user", message:"Username already exists"}]
        }
        res.json(resObject);
      }
      else{
        //create the user with the password
        //TODO: add more options to the user
        try{
          if (req.body.password.length < 8 || req.body.password.length > 50){
            const resObject = {
              registered: false,
              errors: [{path:"password", message: "The password must be between 8 and 50 characters long"}]
            }
            return res.json(resObject);
          }
          const newUserPromise = User.create({
            username: req.body.username,
            password: req.body.password,
            description: req.body.description,
          });
          
          const resObject = {
            registered: true,
            errors:[{path:null, message: null}]
          }
          res.json(resObject);

          //Defer async/await hell
          const newUser = await newUserPromise;
          console.log(newUser.get({plain: true}))
        }
        catch (err){
          //There has been an error
          const resObject = {
            registered: false,
            errors: errorHandler(err, User),
          }
          res.json(resObject);
        } 
      }
    }
    catch (err){
      console.log(err);
      const resObject = {
        registered: false,
        errors: [{ path: "database", message: "Database Error"}]
      }
      res.json(resObject);
    }
  }
  else {
    //no username or password
    const resObject = {
      registered: false,
      errors: [{ path: "incomplete", messsage: "Missing username or password" }]
    }
    res.json(resObject);
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
      res.status(404).json({ message: "Authentication Failed" });
    }
    else if (foundUser){
      //check for password
      try{
        const match = await foundUser.validPassword(req.body.password);
        if(!match){
          res.json({ message: "Authentication failed" });
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
          res.json({ message: "Successfully logged in", token});
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