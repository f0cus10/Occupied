'use strict';
const router = require('express').Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

//read the keys
const privateKEY = fs.readFileSync('./private.key', 'utf8');

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
        const newUser = await User.create({
          username: req.body.username,
          password: req.body.password
        });
        console.log(newUser.get({plain: true}));

        //generate the token
        const payload = {
          check: true
        }

        const i = 'Occupied';
        const a = req.body.username;

        var signOptions = {
          issuer: i,
          audience: a,
          expiresIn: "12h",
          algorithm: "RS256"
        };

        const token = jwt.sign(payload, privateKEY, signOptions);
        console.log("Token - " + token);
        res.status(201).json({ message: "User created", token: token });
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

module.exports = router;