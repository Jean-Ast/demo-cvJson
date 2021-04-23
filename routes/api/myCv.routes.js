const express = require("express");
// const { resolve } = require("node:path");
const router = express.Router();
const cvJson = require("../../cv-json.data");

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
    // console.log(req.body);
    cvJson = req.body;
    resp.send(cvJson)
    // const newSession = {
    //   id:  req.body.id,
    //   msg: req.body.msg
    // }
    // if (!newMessage.id || !newMessage.msg) {
    //   return resp.json({msg: 'Please enter an Id and message'})
    // }
    // messagesJSON.push(newMessage)
    // resp.send(messagesJSON);
  });

module.exports = router;