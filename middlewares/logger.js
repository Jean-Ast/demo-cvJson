//Middleware
const logger = (req, resp, next) => {
  // Every time a make a request the middleware is lanched
  console.log(
    `Hits endpoint => ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};
module.exports = logger;
