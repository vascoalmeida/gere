const express = require("express");
const router = express.Router();
const body_parser = require("body-parser");
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

    console.log(req.body);
    
    var room_info = {
        name: req.body.room_name,
        description: req.body.room_desc,
        img_id: "",
    }
    
    multer_configuration.upload(req, res, (err) => {
        if(err) {
            res.writeHead(503, {"Content-Type": "application/json"});
            res.end();
            return;
        }
        
        var img_name = req.file.filename;
        
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
            console.log("ERR", err);
        });
        
        res.redirect("/#/main/gerir-salas/adicionar");
        res.end();
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

    console.log("AAAAAAAAAA");

    models.Room.findAll({
        attributes: ["id", "img", "name", "description"],
    })
    .then(r => {
        if(r.length === 0) {
            res.writeHead(401);
            res.end();
            return;
        }

        res.json(r);
    })
    .catch(err => {
        console.log(err);
    });
});

router.post("/request", (req, res) => {
    // Create new room request

    let message = "Recieved form submission from " + "room-form".bold;
    output_message("info", message);

    models.Room.findAll({
        attributes: ["id"],
        where: {
            name: req.body.room,
        },
    })
    .then(r => {
        if(r.length === 0) {
            res.writeHead(401);
            res.end();
            return;
        }
    })
    
    req.body.user_id = req.session.user;
    req.body.status = "pendent";

    console.log(req.body);

    models.RoomRequest.create(req.body)
    .then(data => {
        let message = "Successfully created new object " + "room request".bold;
        output_message("success", message);
    })
    .catch(err => {
        output_message("error", "Failed to create new " + "room request".bold + ". More details below.");
        console.log(err);
    });
})

module.exports = router;