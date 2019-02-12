const colors = require("colors");
const msg_types = {
    "error": "ERR!".bgRed.black,
    "info": "INFO".bgBlue.black,
    "success": "SUCS".bgGreen.black,
    "warning": "WARN".bgYellow.black
}

function output(type, msg) {
    console.log(msg_types[type] + " " + msg);
}

module.exports = {
    output_message: output,
}