const express = require("express");
// const { default: cvJson } = require("./cv-json");
const app = express();
const port = process.env.port || 3000;
const logger = require("./middlewares/logger")

// init Middleares
app.use(logger);
app.use(express.json()); // (Handle Json format) With this line of code Express can understand json format
app.use(express.urlencoded({ extended: false })); // (Handle form submitting)


// CV API Routes
app.use("/api/cv", require("./routes/api/myCv.routes"))

/*
  // 3) PUT
  app.put("/messages/:msgId", (req, resp) => {
    // Find message to update
    const found = messagesJSON.some(m => m.id == req.params.msgId);
    
    if(found){
      const updateMsg = req.body;
      messagesJSON.forEach(m => {
        if (m.id == req.params.msgId) {
          m.msg = updateMsg.msg;
        }
      });
      resp.send(messagesJSON)
    } else {
      resp.send({"msg": `Message Id ${req.params.msgId} not found`})
    }
    console.log(found);
  });

  // 4) DELETE
  app.delete("/messages/:msgId", (req, resp) => {
    // Find message to delete
    const found = messagesJSON.some(m => m.id == req.params.msgId);
    const idToDelete = req.params.msgId;

    if ( found ) {
      removeMsg(messagesJSON,idToDelete);
      resp.send({
        "msg": `User ${req.params.msgId} has been deleted`,
        messagesJSON: messagesJSON
      })

    } else {
      resp.send({"msg": `Message Id ${req.params.msgId} not found`})
    }
    console.log(found)
  });
*/
app.listen(port, () => console.log(`Listening on port ${port}`));

const removeMsg = (arr, id) => {
  const index = arr.findIndex((elem) => {
    return elem.id === String(id);
  });
  if (index === -1) {
    return false;
  }
  return arr.splice(index, 1);
};
