const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('./config');

// Make a post route for authentication token
router.post('/authenticate', async (req,res) => {
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

module.exports = router;