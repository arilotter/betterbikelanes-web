// seeecret
const KEY = "AIzaSyCl4kR-p0ieKib-mE4RD7TjQRY6w_MnmyI";
const PORT = process.env.PORT || 6969;

const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const express = require("express");
const bodyParser = require("body-parser");

const dbFile = path.join(__dirname, "database.json");

if (!fs.existsSync(dbFile)) {
  // "touch" file to create it
  fs.closeSync(fs.openSync(dbFile, "w"));
}
const database = new Proxy(JSON.parse(fs.readFileSync(dbFile)), {
  set: (obj, prop, value) => {
    // default behaviour
    obj[prop] = value;
    fs.writeFile(dbFile, JSON.stringify(database));
    return true;
  }
});

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.post("/triggered", (req, res) => {
  if (database[req.body.uuid] === undefined) {
    res.sendStatus(400);
  } else {
    database[req.body.uuid].readings.push(new Date().getTime());
    console.log("reading from " + req.body.uuid);
    res.sendStatus(200);
  }
});

app.post("/networks", (req, res) => {
  console.log("request from " + req.body.uuid);
  fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${KEY}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      wifiAccessPoints: req.body.networks
    })
  })
    .then(res => res.json())
    .then(json => {
      if (json.error) {
        console.log(json);
        res.sendStatus(400);
      } else {
        database[req.body.uuid] = { readings: [], location: json.location };
        console.log("added new device to database: " + req.body.uuid);
        res.sendStatus(200);
      }
    });
});

app.get("/database", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify(database));
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
