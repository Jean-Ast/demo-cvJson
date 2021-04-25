// const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

// module.exports = basicAuth;

// async function basicAuth(req, res, next) {
//     // make authenticate path public
//     if (req.path === '/users/authenticate') {
//         return next();
//     }

//     // check for basic auth header
//     if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
//         return res.status(401).json({ message: 'Missing Authorization Header' });
//     }

//     // verify auth credentials
//     const base64Credentials =  req.headers.authorization.split(' ')[1];
//     const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
//     const [username, password] = credentials.split(':');
//     const user = await userService.authenticate({ username, password });
//     if (!user) {
//         return res.status(401).json({ message: 'Invalid Authentication Credentials' });
//     }

//     // attach user to request object
//     req.user = user

//     next();
// }

// // const express = require("express");
// // const app = require('express')
// // const auth = require('express-basic-auth')

// // const basicAuth = async (req, resp, next) => {
// //   console.log("Basic auth");

// //   const user = await auth(req);
// //   const username = "jean";
// //   const password = "1234";

// //   if (
// //     user && user.name.toLowerCase() === username.toLowerCase() &&
// //     user.pass === password
// //   ) {
// //       resp.end('Auth success')
// //       next();
// //   } else {
// //       resp.statusCode = 401
// //       resp.end('Access denied')
// //       console.log("Auth failure")
// //   }
// // };

// // module.exports = basicAuth;
