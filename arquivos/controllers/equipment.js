const express = require("express");
const router = express.Router();
const body_parser = require("body-parser");
const formidable = require("formidable");
const models = require("../models");
const authentication = require("../middleware/authentication");
const output_message = require("../middleware/output_message").output_message;
const multer_configuration = require("../middleware/multer_configuration");

router.use(body_parser.urlencoded({ extended: true }));
router.use(body_parser.json());
router.use(authentication.authenticate_session);

router.get("/", (req, res) => {
    // Get requested equipment

});

router.post("/", (req, res) => {
    // Create new equipment

    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if(err) {
            let msg = "Error parsing received data to create new " + "Equipment".bold + " object. More details below:"
            output_message("error", msg);
            console.log(err);

            res.sendStatus(400);
            res.end()
            return;
        }

        
        var equipment_info = {};
        
        try {
            var img = files["image"];
            var img_ext = img.name.slice(img.name.lastIndexOf(".") + 1, );
            var img_name = img.path.slice(files["image"].path.indexOf("_") + 1) + "." + img_ext;

            equipment_info["name"] = fields.name;
            equipment_info["description"] = fields.description;
            equipment_info["img"] = img_name;

            if(fields.brand.length > 0) {
                equipment_info["brand"] = fields.brand;
            }
            if(fields.model.length > 0) {
                equipment_info["model"] = fields.model;
            }
        }
        catch(err) {
            let msg1 = "Failed to create new object " + "Equipment.".bold
            let msg2 = "There was an error with the data received. More details below:"
            output_message("error", msg1);
            output_message("error", msg2);
            console.log(err);
            return;
        }

        multer_configuration.upload(req, res, (err) => {
            if(err) {
                let msg = "Failed to upload " + "image".bold + ". More details below:"
                output_message("error", msg);
                console.log(err);

                res.sendStatus(400);
                res.end();
                return;
            }

            models.Image.create({name: img_name})
            .then(r => {
                equipment_info["img_id"] = r.dataValues.id;

                models.Material.create(equipment_info)
                .then(r => {
                    let msg = "Successfully created new object " + "Equipment".bold;
                    output_message("success", msg);
                })
                .catch(err => {
                    let msg = "Failed to create new object " + "Equipment".bold + ". Error output below:";
                    output_message("error", msg);
                    console.log(err);
                    
                    msg = "Stored received image in " + "/media/img".bold + ", but Equipment was not saved in DB";
                    output_message("warning", msg);
                    return;
                });
            })
            .catch(err => {
                let msg = "Failed to create new object " + "Image".bold + ". Error output below:";
                output_message("error", msg);
                console.log(err);
            });

            res.end();
        });
    });
});

router.get("/list", (req, res) => {
    // Get list of equipment

    
});

module.exports = router;