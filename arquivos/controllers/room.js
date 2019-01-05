const express = require("express");
const router = express.Router();
const body_parser = require("body-parser");
const formidable = require("formidable");
const models = require("../models");
const authentication = require("../middleware/authentication");
const output_message = require("../middleware/output_message").output_message;
const multer_configuration = require("../middleware/multer_configuration");

router.use(authentication.authenticate_session);
router.use(body_parser.urlencoded({ extended: true }));
router.use(body_parser.json());

router.post("/", (req, res) => {
    //Create new room

    let msg = "Received form submission to " + "create".bold + " new object " + "Room".bold;
    output_message("info", msg);

    var room_info = {};
    var img_name;

    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if(err) {
            let msg = "Failed to parse received data. Error output below:";
            output_message("error", msg);
            console.log(err);
            return;
        }

        room_info["name"] = fields.name;
        room_info["description"] = fields.description;
        img_name = files["image"].path.slice(files["image"].path.indexOf("_")+1);

    });

    multer_configuration.upload(req, res, (err) => {
        if(err) {
            res.writeHead(500);
            res.end();
            output_message("error", "Failed to upload image. More details below:")
            console.log(err);
            return;
        }

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
        
        res.redirect("/#/main/gerir-salas/adicionar");
        res.end();
    });
});

router.put("/", (req, res) => {
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
                id: fields.id,
            },
        })
        .then(r => {
            console.log(r);
            res.sendStatus(200);
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

router.delete("/", (req, res) => {
    // Delete existing room

    var msg = "Recieved request to " + "delete".bold + " object " + "Room".bold;
    output_message("info", msg);

    models.Room.destroy({
        where: {
            id: req.body.id
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

router.get("/list", (req, res) => {
    //Get list of rooms

    models.Room.findAll({
        attributes: ["id"],
    })
    .then(r => {
        if(r.length === 0) {
            res.end();
            return;
        }
        var room_id = [];
        
        r.map(room => { room_id.push(room.dataValues.id) });
        res.json(room_id);
    })
    .catch(err => {
        let msg = "Failed to get list of " + "Room".bold + " objects. Error output below:";
        output_message("error", msg);
        console.log(err);
        res.sendStatus(500);
        res.end();
    });
});

router.get("/img/:room_id", (req, res) => {
    // Get room images

    var room_id = req.params.room_id;
    
    models.Image.findAll({
        attributes: ["name"],
        where: {
            id: room_id,
        },
    })
    .then(r => {
        res.sendFile(r[0].dataValues.name, {"root": __dirname + "/../media/img/"});
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

router.post("/request", (req, res) => {
    // Create new room request

    let message = "Recieved form submission from " + "room-form".bold;
    output_message("info", message);

    console.log(req.body);

    /*models.Room.findAll({
        attributes: ["id"],
        where: {
            name: req.body.room,
        },
    })
    .then(r => {
        if(r.length === 0) {
            res.writeHead(404);
            res.end();
            return;
        }
    })
    
    req.body.user_id = req.session.user;
    req.body.status = "pendent";

    models.RoomRequest.create(req.body)
    .then(data => {
        let message = "Successfully created new object " + "room request".bold;
        output_message("success", message);
    })
    .catch(err => {
        output_message("error", "Failed to create new " + "room request".bold + ". More details below.");
        console.log(err);
    });*/
});

module.exports = router;