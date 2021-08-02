const express = require("express");
const callbackRouter = express.Router();
const passport = require('passport');

passport.initialize();
passport.session();

callbackRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post((req, res) => {
    res.end(
      `Registering ${req.body.name}`
    );
  })
  .get((req, res) => {
    passport.authenticate('github', { failureRedirect: '/fail' }),
    function(req, res) {
      console.log("fail");
      res.end(`<html><body><h1>test</body></html>`);
    //   res.end(`<html><body><h1>${req.user.username}</h1><h1>${req.user.profileUrl}</body></html>`);
  }})
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /callback");
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end("DELETE operation (currently) not supported on /register");
  });

module.exports = callbackRouter;
