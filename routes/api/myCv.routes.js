const express = require("express");
const router = express.Router();
var cvJson = require("../../cv-json.data");
let etag = require("etag");


// 1) GETs => cv
router.get("/mycv/", (req, resp) => {
  resp.setHeader("Etag", etag(JSON.stringify(cvJson)));
  resp.json(cvJson);
});

// 1.1) Rutas navegables (cv.session)
router.get("/mycv/:session", (req, resp) => {
  console.log(req.params)
  resp.setHeader("Etag", etag(JSON.stringify(cvJson)));
  resp.send(cvJson[req.params.session]);
});

// 1.2) Rutas navegables (cv.session.subSession)
router.get('/mycv/:session/ss/:subsession', (req, resp) => {
  resp.setHeader("Etag", etag(JSON.stringify(cvJson)));
  // Retrieve params
  let mysession = req.params.session
  let mySubsession = req.params.subsession
  // Create a new cvJson json to access subsession 
  let newcvJson = cvJson[mysession]
  // Sending the new cvJson
  resp.send(newcvJson[mySubsession]);
});

// 2) POST a new session
router.post("/newsession", (req, resp) => {
  try {
    if (req.body != null) {
      var newSession = req.body;
      cvJson = { cvJson, ...newSession };
    }
  } catch (error) {
    console.log(error);
  }
  resp.setHeader("Etag", etag("body"));
  resp.send(cvJson);
});

// 3) PUT session
router.put("/:session", (req, resp) => {
  // Find seccion
  var myValue = req.params.session;
  var result = cvJson[myValue];
  var newSession = req.body;

  // Headers
  resp.setHeader("Etag", etag(JSON.stringify(cvJson)));

  Object.keys(cvJson).forEach((key) => {
    if (cvJson[key] === result) {
      // Delete session
      delete cvJson[key];
      // Insert it modified
      cvJson[key] = newSession;
    }
  });
  resp.send(cvJson);
});

// 4) DELETE session
router.delete("/:session", (req, resp) => {
  // console.log(req)
  // console.log(resp)
  // Find seccion
  var myValue = req.params.session;
  var result = cvJson[myValue];
  var newSession = req.body;
  Object.keys(cvJson).forEach((key) => {
    if (cvJson[key] === result) {
      // Delete session
      delete cvJson[key];
    }
  });

  resp.send(cvJson);
});

module.exports = router;
