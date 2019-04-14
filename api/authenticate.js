'use strict';
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('./config');
const { User } = require('../models');

// // Make a post route for authentication token
// router.post('/signup', async (req,res) => {
//   if (req.body.username == config.username) {
//     if (req.body.password == config.password){
//       //we can create our token
//       const payload = {
//         check: true
//       }

//       var token = jwt.sign(payload, config.secret, {
//         expiresIn: 1440 //24 hours
//       });

//       res.json({
//         message: "Login Successful",
//         token: token
//       });
//     }
//     else {
//       res.json({ message: "Incorrect Password" });
//     }
//   }
//   else {
//     res.json({message: "User not found!" });
//   }
// })

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
        res.status(409).json({ message: "Username already exists" });
      }
      else{
        //create the user with the password
        const newUser = await User.create({
          username: req.body.username,
          password: req.body.password
        });
        console.log(newUser.get({plain: true}));
        res.status(201).json({ message: "User created" });
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