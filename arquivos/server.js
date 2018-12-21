const express = require("express");
const body_parser = require("body-parser");
const Sequelize = require("sequelize");
const db_cred = require("./db_credentials.json");
const room = require("./controllers/room");
const user = require("./controllers/user");
const output_message = require("./middleware/output_message").output_message;
const session_middleware = require("./middleware/session");

const app = express();
const port = 8080;
const sequelize = new Sequelize(db_cred.database, db_cred.username, db_cred.password, {
    host: db_cred.host,
    dialect: db_cred.dialect,
});

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(session_middleware);
app.use("/room", room);
app.use("/user", user);

sequelize.authenticate()
.then((r) => {
    output_message("success", "Successfully connected to DB");
})
.catch((err) => {
    output_message("error", "Failed to connect to database. Error output below:\n" + err);
});

app.listen(port, () => output_message("info", "Server running on port " + (port.toString()).bold));