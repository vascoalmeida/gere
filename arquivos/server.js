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

function output(type, msg) {
    console.log(msg_types[type] + " " + msg);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

    const req_body = req.body;
    console.log(req_body);
});

app.listen(port, () => output("info", "Server running on port " + (port.toString()).bold));