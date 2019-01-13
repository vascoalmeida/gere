const express = require("express");
const session = require("express-session");
const router = express.Router();
const scr = require("../session_secret.json");

router.use(session({
    secret: scr.secret,
    resave: true,
    saveUninitialized: true,
}));

module.exports = router;