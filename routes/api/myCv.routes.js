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
  router.post(":session", (req, resp) => {

  });

module.exports = router;