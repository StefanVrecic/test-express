const express = require("express");
const morgan = require("morgan");
const passport = require('passport');
const util = require('util');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const bodyParser = require('body-parser');
const authRouter = require("./routes/authRouter");
const registerRouter = require("./routes/registerRouter");
const callbackRouter = require("./routes/callbackRouter");

const hostname = "localhost";
const port = 3000;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new GitHubStrategy({
  clientID: '62e00f1603339251ea53',
  clientSecret: 'd9932853f3af81a7855ceef05a7b045e50dd9579',
  callbackURL: "http://localhost:3000/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
))

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/login", authRouter);
app.use("/register", registerRouter);
app.use("/callback", callbackRouter);

app.get('/fail', 
  function(req, res) {
    res.end(`<html><body><h1>Failed</h1></body></html>`);
  });

// app.use(express.static(__dirname + "/public"));


app.use((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>Identity Provider Demo</h1></body></html>");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
