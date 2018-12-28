const express = require("express");
const router = express.Router();
const body_parser = require("body-parser");
const formidable = require("formidable");
const models = require("../models");
const authentication = require("../middleware/authentication");
const output_message = require("../middleware/output_message").output_message;
const multer_configuration = require("../middleware/multer_configuration");

router.use(body_parser.urlencoded({ extended: true }));
router.use(body_parser.json());
router.use(authentication.authenticate_session);

router.post("/", (req, res) => {
    // Create new equipment

});

module.exports = router;