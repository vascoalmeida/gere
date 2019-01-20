const express = require("express");
const body_parser = require("body-parser");
const fs = require("fs");
const formidable = require("formidable");
const router = express.Router();
const models = require("../models");
const crypto_functions = require("../middleware/crypto_functions");
const output_message = require("../middleware/output_message").output_message;

router.use(body_parser.urlencoded({ extended: true }));
router.use(body_parser.json());

router.post("/login", (req, res) => {
    // Login user

    models.User.findAll({
        where: {
            email: req.body.email,
            status: "Ativo",
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
            req.session.user = result[0].dataValues.email;
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

router.post("/activate", (req, res) => {
    // Activate user

    let message = "Recieved request to activate " + "User".bold;
    output_message("info", message);

    var password_salt = crypto_functions.gen_random_string(10);
    var hashed_password = crypto_functions.hash_string(req.body.password, password_salt).hashed_string;

    req.body.password = hashed_password;
    req.body.password_salt = password_salt;    

    models.User.update({
        name: req.body.name,
        password: req.body.password,
        passwordSalt: req.body.password_salt,
        class: req.body.class,
        status: "Ativo",
    }, {
        where: {
            email: req.body.email,
            status: "Pendente",
        },
    })
    .then(r => {
        if(r[0]) {
            let msg = "Successfully activated object " + "User".bold;
            output_message("success", msg);
            res.end();
        }
        else {
            let msg = "Failed to activate object " + "User".bold + ". Most likely due to bad client request.";
            output_message("warning", msg);
            res.sendStatus(401);
        }
    })
    .catch(err => {
        let msg = "Failed to activate object " + "User".bold + ". More details below.\n" + err;
        output_message("error", msg);
        res.end();
    });

});

router.post("/register", (req, res) => {
    // Create users from received emails

    var emails_arr = req.body.emails.split("\n");
    
    emails_arr.forEach(email => {
        if(email.length === 0) {
            return;
        }

        var user_info = {};
        user_info["email"] = email;
        user_info["status"] = "Pendente";

        models.User.create(user_info)
        .then(r => {
            let message = "Successfully created new object " + "User".bold;
            output_message("success", message);
        })
        .catch(err => {
            if(err.parent.code === "23505") {
                let msg = "Received request to create an already existing " + "User".bold + " object.";
                output_message("warning", msg);
                return;
            }
            output_message("error", "Failed to create new object " + "User".bold + ". More details below:");
            console.log(err);
        });
    });

    res.end();
});

/*router.post("/em", (req, res) => {
    console.log(req.body);
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
});*/

router.get("/logout", (req, res) => {
    // Logout current user

    req.session.destroy();
    res.end();
});

module.exports = router;