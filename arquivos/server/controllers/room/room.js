const express = require("express");
const router = express.Router();
const body_parser = require("body-parser");
const formidable = require("formidable");
const models = require("../../models");
const authentication = require("../../middleware/authentication");
const output_message = require("../../common_modules/output_message").output_message;
const order_filter_request = require("../../common_modules/filter_order_requests").order_filter_request;
const crypto_functions = require("../../common_modules/crypto_functions");
const multer_configuration = require("../../middleware/multer_configuration");
const room_request = require("./request");

router.use(body_parser.urlencoded({ extended: true }));
router.use(body_parser.json());
router.use(authentication.authenticate_session);
router.use("/request", room_request);

router.post("/", authentication.authenticate_admin, (req, res) => {
    //Create new room

    let msg = "Received form submission to " + "create".bold + " new object " + "Room".bold;
    output_message("info", msg);

    var room_info = {};
    var img_name;

    var form = new formidable.IncomingForm();

    form.on("fileBegin", function(name, file) {
        console.log("OINFILE", name);
        var file_ext = file.name.slice(file.name.lastIndexOf("."));
        img_name = crypto_functions.gen_random_string(20) + file_ext;
        file.path = __dirname + "/../../media/img/" + img_name;
    })
    
    form.parse(req, (err, fields, files) => {
        if(err) {
            let msg = "Failed to parse received data. Error output below:";
            output_message("error", msg);
            console.log(err);
            res.end();
            return;
        }

        console.log("FILES", files);

        room_info["name"] = fields.name;
        room_info["description"] = fields.description;

        models.Image.create({name: img_name})
        .then(r => {
            room_info.img_id = r.dataValues.id;
            models.Room.create(room_info)
            .then(r => {
                let msg = "Successfully created new object " + "Room".bold;
                output_message("success", msg);
            })
            .catch(err => {
                let msg = "Failed to create new object " + "Room".bold + ". Error output below:";
                
                output_message("error", msg);
                console.log(err);
                
                msg = "Stored received image in " + "/media/img".bold + ", but Room was not saved in DB";
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

router.put("/:room_id", authentication.authenticate_admin, (req, res) => {
    // Edit existing room

    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if(err) {
            let msg = "Failed to parse received " + "Edit Room ".bold + "data. More details below:";
            output_message("error", msg);
            console.log(err);
            res.sendStatus(500);
            res.end();
            return;
        }

        models.Room.update({
            name: fields.name,
            description: fields.description,
        }, {
            where: {
                id: req.params.room_id,
            },
        })
        .then(r => {
            let msg = "Successfuly updated object " + "Room".bold;
            output_message("success", msg);
            console.log(r);
            res.sendStatus(200);
            res.end();
        })
        .catch(err => {
            let msg = "Failed to " + "update Room".bold + " object. More details below:";
            output_message("error", msg);
            console.error(err);
            res.sendStatus(500);
            res.end();
        });
    });
});

router.delete("/:room_id", authentication.authenticate_admin, (req, res) => {
    // Delete existing room

    var msg = "Recieved request to " + "delete".bold + " object " + "Room".bold;
    output_message("info", msg);

    models.Room.destroy({
        where: {
            id: req.params.room_id
        }
    })
    .then(r =>{
        msg = "Successfully " + "deleted".bold + " object " + "Room".bold;
        output_message("success", msg);
        res.writeHead(200);
        res.end();
    })
    .catch(err => {
        msg = "Failed to " + "delete".bold + " object " + "Room".bold + ". More details below:";
        output_message("error", msg);
        console.log(err);
        res.writeHead(500);
        res.end()
    });
});

router.all("/list", (req, res) => {
    //Get list of rooms

    var order_filter = order_filter_request(req, res);

    models.Room.findAll({
        attributes: ["id"],
        where: order_filter.where,
        order: order_filter.order,
    })
    .then(r => {
        res.json(r.map(room => room.dataValues.id));
    })
    .catch(err => output_message("error", "Failed to run query on database. More details below:\n" + err));
});

router.get("/img/:room_id", (req, res) => {
    // Get room images

    var room_id = req.params.room_id;
    
    models.Room.findAll({
        attributes: ["img_id"],
        where: {
            id: room_id,
        },
    })
    .then(r => {
        models.Image.findAll({
            attributes: ["name"],
            where: {
                id: r[0].dataValues.img_id,
            },
        })
        .then(r_img => {
            try {
                res.sendFile(r_img[0].dataValues.name, {"root": __dirname + "/../../media/img/"});
            }
            catch(err) {
                output_message("error", "Failed to send requested image to client. More details below:\n" + err);
                res.end();
                return;
            }
        })
        .catch(err => {
            output_message("error", "Failed to fetch image from DB. More details below:");
            console.log(err);
        });
    })
    .catch(err => {
        output_message("error", "Failed to fetch image from DB. More details below:");
        console.log(err);
        res.sendStatus(404);
        res.end();
    });
});

router.get("/info/:room_id", (req, res) => {
    // Get room info

    var room_id = req.params.room_id;

    models.Room.findAll({
        attributes: ["name", "description"],
        where: {
            id: room_id,
        },
    })
    .then(r => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(r[0].dataValues));
    })
    .catch(err => {
        let msg = "Failed to fetch " + "Room".bold + " info from DB. More details below:";
        output_message("error", msg);
        console.log(err);
        res.sendStatus(404);
        res.end();
    });
});

module.exports = router;