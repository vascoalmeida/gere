const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const colors = require("colors");
const sequelize = require("sequelize");

const app = express();
const port = 8000;
const seq_con = new sequelize("arquivos_db", "arquivos_user", "password", {
    host: "localhost",
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

seq_con.authenticate()
.then(() => {
    output("success", "Successfully connected to DB");
})
.catch((err) => {
    output("error", "Failed to connect to database. Error output below:\n" + err);
})

app.get("/login", (req, res) => {
    let message = "Recieved request for " + "/login".bold;
    output("info", message);
});

app.get("/main", (req, res) => {
    let message = "Recieved request for " + "/main".bold;
    output("info", message);
});

app.post("/request-room", (req, res) => {
    let message = "Recieved form submission from " + "room-form".bold;
    output("info", message);
});

app.post("/request-material", (req, res) => {
    let message = "Recieved form submission from " + "material-form".bold;
    output("info", message);
});

app.listen(port, () => output("info", "Server running on port " + (port.toString()).bold));