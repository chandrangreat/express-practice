const express = require("express");

const users = require("./fixtures/users");
const emails = require("./fixtures/emails");

let app = express();

let getUsers = (req, res) => {
  res.send(users);
};

let getEmails = (req, res) => {
  res.send(emails);
};

const routes = {
  "GET /users": getUsers,
  "GET /emails": getEmails,
};

let noRoutesHandler = (req, res) => {
  let route = req.method + " " + req.url;
  res.end("You asked for " + route + " which is not being served");
};

app.use((req, res) => {
  let route = req.method + " " + req.url;

  let handler = routes[route] || noRoutesHandler;
  handler(req, res);
});

app.listen(3000);
