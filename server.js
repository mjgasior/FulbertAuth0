const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkScope = require("express-jwt-authz");
const fs = require("fs");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/.well-known/jwks.json`
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

const app = express();

app.get("/delay", function(req, res) {
  let rawdata = fs.readFileSync("sampleData.json");
  let users = JSON.parse(rawdata);
  setTimeout(
    () =>
      res.json({
        users
      }),
    5000
  );
});

app.get("/public", function(req, res) {
  res.json({
    message: "Hello from public api"
  });
});

app.get("/private", checkJwt, function(req, res) {
  res.json({
    message: "Hello from private api"
  });
});

function checkRole(role) {
  return function(req, res, next) {
    const assignedRoles = req.user["http://localhost:3000/roles"];
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next();
    } else {
      return res.status(401).send("ni mosz roli gospodarzu!");
    }
  };
}

app.get("/admin", checkJwt, checkRole("admin"), function(req, res) {
  res.json({
    message: "Hello from admin api"
  });
});

app.get("/course", checkJwt, checkScope(["read:courses"]), function(req, res) {
  res.json({
    courses: [{ id: 1, title: "kurs pirsze" }, { id: 2, title: "drugi kurc" }]
  });
});

app.listen(3001);
console.log("api serwer chodzi na:" + process.env.REACT_APP_API_URL);
