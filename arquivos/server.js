const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const colors = require("colors");
const Sequelize = require("sequelize");
const session = require("express-session");
const models = require('./models');
const db_cred = require("./db_credentials.json");
const scr = require("./session_secret.json");

const app = express();
const port = 8000;
const sequelize = new Sequelize(db_cred.database, db_cred.username, db_cred.password, {
    host: db_cred.host,
    dialect: "postgres",
});
const msg_types = {
    "error": "ERR!".bgRed.black,
    "info": "INFO".bgBlue.black,
    "success": "SUCS".bgGreen.black,
    "warning": "WARN".bgYellow.black
}

function output(type, msg) {
    console.log(msg_types[type] + " " + msg);
}

function random_string(len) {
    return crypto.randomBytes(Math.ceil(len / 2)).toString("hex").slice(0, len);
}

function hash_string(str, salt) {
    var hash = crypto.createHmac("sha512", salt);
    hash.update(str);

    return {
        salt: salt,
        hashed_string: hash.digest("hex"),
    }
}

function auth(req, res, next) {
    console.log(req.session);
    if(req.session && req.session.user) {
        return next(req, res);   
    }
    return res.sendStatus(401);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: scr.secret,
    resave: true,
    saveUninitialized: true,
}));

sequelize.authenticate()
.then(() => {
    output("success", "Successfully connected to DB");
})
.catch((err) => {
    output("error", "Failed to connect to database. Error output below:\n" + err);
});

app.post("/login", (req, res) => {
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

        if(hash_string(req.body.password, salt).hashed_string === password) {
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
        output("error", message);
        console.log(err);
    });
});

app.get("/main", auth, (req, res) => {
    let message = "Recieved request for " + "/main".bold;
    output("info", message);
    //res.end(req.session);
});

app.post("/register", (req, res) => {
    let message = "Recieved request to create " + "User".bold;
    output("info", message);

    var password_salt = random_string(10);
    var hashed_password = hash_string(req.body.password, password_salt).hashed_string;

    req.body.status = "pendent";
    req.body.password = hashed_password;
    req.body.passwordSalt = password_salt;

    models.User.create(req.body)
    .then(data => {
        let message = "Successfully created new object " + "User".bold;
        output("success", message);
    })
    .catch(err => {
        output("error", "Failed to create " + "User".bold + ". More details below.");
        console.log(err);
    });
});

app.post("/request-room", auth, (req, res) => {
    let message = "Recieved form submission from " + "room-form".bold;
    output("info", message);
});

app.post("/request-material", auth, (req, res) => {
    let message = "Recieved form submission from " + "material-form".bold;
    output("info", message);
});

app.get("/logout", auth, (req, res) => {
    console.log("AAAAAAAAAAAAAAAA");
    req.session.destroy();
});

app.listen(port, () => output("info", "Server running on port " + (port.toString()).bold));