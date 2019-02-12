const crypto = require("crypto");

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

module.exports = {
    gen_random_string: random_string,
    hash_string: hash_string,
}