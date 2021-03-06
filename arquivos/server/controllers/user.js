const express = require("express");
const body_parser = require("body-parser");
const fs = require("fs");
const formidable = require("formidable");
const router = express.Router();
const models = require("../models");
const crypto_functions = require("../common_modules/crypto_functions");
const output_message = require("../common_modules/output_message").output_message;
const authentication = require("../middleware/authentication");
const order_filter_request = require("../common_modules/filter_order_requests").order_filter_request;

router.use(body_parser.urlencoded({ extended: true }));
router.use(body_parser.json());

router.get("/", authentication.authenticate_session, (req, res) =>{
    // Get logged user

    models.User.findAll({
        attributes: ["name", "class", "rank"],
        where: {
            email: req.session.user,
        },
    })
    .then(r => {
        var user_info = r[0].dataValues;
        user_info["email"] = req.session.user;

        res.json(user_info);
    })
    .catch(err => {
        output_message("error", "Failed to get requested " + "User".bold + ". More details below:\n" + err);
        res.end();
    });
});

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
            req.session.rank = parseInt(result[0].dataValues.rank);
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

router.get("/deactivate/:user_email", authentication.authenticate_session, authentication.authenticate_admin, (req, res) => {
    // Deactivate user

    models.User.update({
        status: "Inativo",
    }, {
        where: {
            email: req.params.user_email,
        },
    })
    .then(r => {
        output_message("success", "Deactivated object " + "User".bold + ".");
    })
    .catch(err => {
        output_message("error", "Failed to deactivate object " + "User".bold + ". More details below:\n" + err);
    });
});

router.post("/register", authentication.authenticate_session, authentication.authenticate_admin, (req, res) => {
    // Create users from received emails

    var emails_arr = req.body.emails.split("\n");
    
    emails_arr.forEach(email => {
        if(email.length === 0) {
            return;
        }

        var user_info = {};
        user_info["email"] = email;
        user_info["status"] = "Pendente";
        user_info["rank"] = 0;

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

router.all("/list", authentication.authenticate_session, authentication.authenticate_admin, (req, res) => {
    // Send list of emails
    console.log("AAAAAAAAAAAAAAAAAA", req.body)

    var order_filter = order_filter_request(req, res);

    models.User.findAll({
        attributes: ["email"],
        where: order_filter.where,
        order: order_filter.order,
    })
    .then(r => {
        var users_list = [];
        r.forEach(user => {
            users_list.push(user.dataValues.email);
        });

        console.log(users_list);
        
        res.json({users_list});
    })
    .catch(err => {
        let msg = "Failed to get list of users from Database. More details below:\n" + err;
        output_message("error", msg);
        res.end();
    });
});

router.get("/info/:user_email", authentication.authenticate_session, authentication.authenticate_admin, (req, res) => {
    // Get info of a certain user

    models.User.findAll({
        attributes: ["name", "email", "class", "status", "rank"],
        where: {
            email: req.params.user_email,
        },
    })
    .then(r => {
        res.json(r[0].dataValues);
    })
    .catch(err => {
        let msg = "Failed to get " + "User".bold + " info from Database. More details below:\n" + err;
        output_message("error", msg);
        res.end();
    });
});

router.post("/em", (req, res) => {
    var password_salt = crypto_functions.gen_random_string(10);
    var hashed_password = crypto_functions.hash_string(req.body.password, password_salt).hashed_string;

    req.body.status = "Ativo";
    req.body.password = hashed_password;
    req.body.passwordSalt = password_salt;
    req.body.rank = 1;

    models.User.create(req.body)
    .then(data => {
        let message = "Successfully created new object " + "User".bold;
        output_message("success", message);
    })
    .catch(err => {
        output_message("error", "Failed to create " + "User".bold + ". More details below:\n" + err);
    });
});

router.get("/logout", authentication.authenticate_session, (req, res) => {
    // Logout current user

    req.session.destroy();
    res.end();
});

module.exports = router;