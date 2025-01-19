// const http = require("node:http");
const express = require("express");

const users = require("./fixtures/users");
const emails = require("./fixtures/emails");
const { stringify } = require("csv-stringify/sync");
const builder = require("xmlbuilder");

let app = express();

function convertToCsv(items) {
  const csvFile = stringify(items, {
    header: true,
  });
  return csvFile;
}

function convertToXML(items, type) {
  const xml = builder.create(type);
  items.forEach((item) => {
    const singleItem = xml.ele("item");
    singleItem.ele(item);
  });
  const result = xml.end({ pretty: true });
  console.log(result);
  return result;
}

function formatDataByContentType(res, data, contentType) {
  switch (contentType) {
    case "json":
      res.send(data);
      break;
    case "csv":
      csvData = convertToCsv(data);
      res.type("text/csv");
      res.send(csvData);
      break;
    case "xml":
      xmlData = convertToXML(data, "items");
      res.type("application/xml");
      res.send(xmlData);
      break;
    default:
      res.send(data);
  }
}

app.use((req, res) => {
  let route = req.method + " " + req.url;

  const accepts = req.accepts(["csv", "json", "xml"]);
  if (route === "GET /users") {
    formatDataByContentType(res, users, accepts);
  } else if (route === "GET /emails") {
    formatDataByContentType(res, emails, accepts);
  } else {
    res.end("You asked for " + route);
  }
});

// let server = http.createServer(app);

// server.listen(3000);
app.listen(3000);
