const express = require("express");
const body_parser = require("body-parser");
const router = express.Router();
const models = require("../models");
const crypto_functions = require("../middleware/crypto_functions");
const authentication = require("../middleware/authentication");
const output_message = require("../middleware/output_message").output_message;

router.use(body_parser.urlencoded({ extended: true }));
router.use(body_parser.json());

router.post("/login", (req, res) => {
    // Login user

    models.User.findAll({
        where: {
            email: req.body.email,
        }
    })
    .then(result => {
        if(result.length === 0) {
            res.writeHead(401);
            res.end();
            return;
        }

        var password = result[0].dataValues.password;
        var salt = result[0].dataValues.passwordSalt;

        if(crypto_functions.hash_string(req.body.password, salt).hashed_string === password) {
            req.session.user = result[0].dataValues.id;
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end();
        }
        
        else {
            res.writeHead(401);
            res.end();
            return;
        }        
    })
    .catch(err => {
        let message = "Failed to run " + "login ".bold + "query on DB. More details below:"
        output_message("error", message);
        console.log(err);

        res.writeHead(500);
        res.end();
    });
});

router.post("/register", (req, res) => {
    // Register new user

    let message = "Recieved request to create " + "User".bold;
    output_message("info", message);

    var password_salt = crypto_functions.gen_random_string(10);
    var hashed_password = crypto_functions.hash_string(req.body.password, password_salt).hashed_string;

    req.body.status = "pendent";
    req.body.password = hashed_password;
    req.body.passwordSalt = password_salt;

    models.User.create(req.body)
    .then(data => {
        let message = "Successfully created new object " + "User".bold;
        output_message("success", message);
    })
    .catch(err => {
        output_message("error", "Failed to create " + "User".bold + ". More details below.");
        console.log(err);
    });
})

router.get("/logout", (req, res) => {
    // Logout current user

    req.session.destroy();
    res.end();
});

module.exports = router;