const express = require("express");
const registerRouter = express.Router();

registerRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post((req, res) => {
    res.end(
      `Registering ${req.body.user} with password: ${req.body.password}`
    );
  })
  .get((req, res) => {
    res.statusCode = 403;
    res.end("GET operation not supported on /register");
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /register");
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end("DELETE operation (currently) not supported on /register");
  });

module.exports = registerRouter;
