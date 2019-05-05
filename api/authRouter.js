'use strict';
//inherit from express router
const AuthRouter = require('express').Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');

//read the keys
let publicKEY;
if (process.env.NODE_ENV === 'production') {
  publicKEY = process.env.PUBLIC_KEY;
} else {
  publicKEY = fs.readFileSync('./public.key', 'utf8');
}

/*
 * a Middleware for validating the JSON Web Token and allowing
 * access to the protected routes.
 * 
 * 
 */

AuthRouter.use(async (req, res, next) => {
  //check header for the token
  const token = req.headers['access-token'];
  if(token){
    var verifyOptions = {
      issuer:'Occupied',
    }
    jwt.verify(token, publicKEY, verifyOptions, (err, decoded) => {
      if (err){
        res.status(401).json({ message: 'Invalid Token' });
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


module.exports = AuthRouter;