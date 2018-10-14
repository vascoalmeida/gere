const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const colors = require("colors");

const app = express();
const port = 8000;
const msg_types = {
    "error": "ERR!".bgRed.black,
    "info": "INFO".bgBlue.black,
    "success": "SUCS".bgGreen.black,
    "warning": "WARN".bgYellow.black
}

app.use(bodyParser.json());

function output(type, msg) {
    console.log(msg_types[type] + " " + msg);
}

app.get("/login", (req, res) => {
    let message = {string:"Recieved request for /login"};
    output("info", message["string"]);
    res.send(message);
});

app.post("/login", (req, res) => {
    console.log(req.body);
});

app.listen(port, () => output("info", "Server running on port " + port));