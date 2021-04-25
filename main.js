const express = require("express");
const basicAuth = require("./middlewares/basicAuth");
const app = express();
const port = process.env.port || 3000;
const logger = require("./middlewares/logger")

// app.use(basicAuth({
//     users: { 'jean': '1234' }
// }))
// init Middleares
app.use(logger);
// app.use(basicAuth);
app.use(express.json()); // (Handle Json format) With this line of code Express can understand json format
app.use(express.urlencoded({ extended: false })); // (Handle form submitting)


// CV API Routes
app.use("/api/cv", require("./routes/api/myCv.routes"))

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
