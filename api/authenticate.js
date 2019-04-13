const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('./config');
const { User } = require('../models');

// Make a post route for authentication token
router.post('/signup', async (req,res) => {
  if (req.body.username == config.username) {
    if (req.body.password == config.password){
      //we can create our token
      const payload = {
        check: true
      }

      var token = jwt.sign(payload, config.secret, {
        expiresIn: 1440 //24 hours
      });

      res.json({
        message: "Login Successful",
        token: token
      });
    }
    else {
      res.json({ message: "Incorrect Password" });
    }
  }
  else {
    res.json({message: "User not found!" });
  }
})

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
    //if (user) respond user found 
    //else
      //create user
        //store password using bcrypt
      //create token
      //send token
  }
  else {
    //no username or password
    res.json({ message: "Missing username or password" });
  }
})

module.exports = router;