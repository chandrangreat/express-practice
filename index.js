// const http = require("node:http");
const express = require("express");

const users = require("./fixtures/users");
const emails = require("./fixtures/emails");

let app = express();

app.use((req, res) => {
  let route = req.method + " " + req.url;

  if (route === "GET /users") {
    res.send(users);
  } else if (route === "GET /emails") {
    res.send(emails);
  } else {
    res.end("You asked for " + route);
  }
});

// let server = http.createServer(app);

// server.listen(3000);
app.listen(3000);
