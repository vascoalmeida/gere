const express = require("express");
const app = express();
const port = 8000;

app.get("/login", (req, res) => {
    res.send({express: "Hello from Express"});
});

app.listen(port, () => console.log("Server running on port %d", port));