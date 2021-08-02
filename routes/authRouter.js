const express = require("express");
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const authRouter = express.Router();

passport.initialize();
passport.session();


authRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post((req, res) => {
    res.end("POST login ");
  })
  .get(
  passport.authenticate('github', { scope: [ 'user:email' ] }), function(req, res){
    console.log('test===============');
    console.log('test===============');
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /login");
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /login");
  });


module.exports = authRouter;
