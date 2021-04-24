const express = require("express");
// const { resolve } = require("node:path");
const router = express.Router();
var cvJson = require("../../cv-json.data");
let etag = require('etag')
var crypto = require('crypto');

var md5sum = crypto.createHash('md5');

// 1) GET => cv
router.get("/", (req, resp) => {
  resp.setHeader('Etag',etag("body"))
  // resp.setHeader('etag', '"foobar"')
    resp.json(cvJson);
  });

  // 2) POST a new session
  router.post("/", (req, resp) => {
    try {
      if(req.body != null){
        var newSession = req.body;
        cvJson =  {cvJson,...newSession};
       //  data =  req.body;
       //  console.log("Entre",cvJson)
      }
    } catch (error) {
      console.log(error);
    }
    resp.setHeader('Etag',etag("body"))
    resp.send(cvJson)
  });

  // 3) PUT session
  router.put("/:session", (req, resp) => {
    // Find seccion
    var myValue = req.params.session;
    var result = cvJson[myValue];
    var newSession = req.body;
    Object.keys(cvJson).forEach((key)=> {
      if (cvJson[key] === result) {
        // Delete session
        delete cvJson[key];
        // Insert it modified
        cvJson[key] = newSession;
      }
    })
    resp.setHeader('Etag',etag(md5sum.update(JSON.stringify(newSession)).digest("base64")))
    console.log(md5sum)
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
  Object.keys(cvJson).forEach((key)=> {
    if (cvJson[key] === result) {
      // Delete session
      delete cvJson[key];
    }
  })
  
  resp.setHeader('Etag',etag("body"))
  resp.send(cvJson);
});

// 5) PATCH session

module.exports = router;

