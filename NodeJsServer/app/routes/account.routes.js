const multer = require('multer')
const authJwt = require('../middleware/authJwt')
const rateLimit = require('express-rate-limit')
const validate = require('../middleware/validate')
const accountValidators = require('../middleware/validators/account.validators')

const isTest = process.env.NODE_ENV === 'test';
const passthrough = (req, res, next) => next();

const loginLimiter = isTest ? passthrough : rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts, please try again in 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
})

const signupLimiter = isTest ? passthrough : rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: 'Too many accounts created from this IP, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
})

module.exports = app => {
  const accounts = require("../controllers/account.controller.js");
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  let upload = multer();

  //Create a new account
  router.post("/", signupLimiter, upload.none(), accountValidators.createRules, validate, accounts.create);

  // Login account
  router.post("/login", loginLimiter, upload.none(), accountValidators.loginRules, validate, auth.signIn)

  // Logout account
  router.post("/logout", auth.signOut)

  //Retrieve all accounts
  router.get("/", accounts.findAll);

  //Retrieve an account by username
  router.get("/username/:username", accounts.findByUsername);

  //Retrieve accounts by type
  router.get("/type/:type", accounts.findByType);

  //Delete an account by username
  router.delete("/:username", authJwt.verifyToken, accounts.delete);

  //Update/Edit an account by username
  router.put("/:username", authJwt.verifyToken, accounts.edit);

  // Retrieve account info by username
  router.get("/info/:username", accounts.getUserInfo)

  app.use('/api/accounts', router);
};
