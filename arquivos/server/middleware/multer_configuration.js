const multer = require("multer");
const path = require("path");
const crypto_functions = require("./crypto_functions");

const storage = multer.diskStorage({
    destination: "./media/img/",
    filename: function(req, file, callback) {
        callback(null, crypto_functions.gen_random_string(30) + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
}).single("uploaded_img");

module.exports = {
    upload: upload,
}