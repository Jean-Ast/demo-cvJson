const express = require("express");
// const { resolve } = require("node:path");
const router = express.Router();
var cvJson = require("../../cv-json.data");

// 1) GET => All cvs
router.get("/", (req, resp) => {
    resp.json(cvJson);
  });
  
  // 1.1) GET a single CV
  router.get("/:email", (req, resp) => {
    // resp.json(req.params.email);
    const found = cvJson.some(m => m.basics.email == req.params.email);
    if(found){
        resp.json(cvJson.filter(p => p.basics.email === req.params.email))
      } else {
        resp.status(400).json({"people": `People CV ${req.params.email} not found`})
      }
      console.log(found);
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
    resp.send(cvJson);
  });

  // function getKeys(obj, val) {
  //   var objects = [];
  //   for (var i in obj) {
  //       if (!obj.hasOwnProperty(i)) continue;
  //       if (typeof obj[i] == 'object') {
  //           objects = objects.concat(getKeys(obj[i], val));
  //       } else if (obj[i] == val) {
  //           objects.push(i);
  //       }
  //   }
    // return objects;
// }
module.exports = router;