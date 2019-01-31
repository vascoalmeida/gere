const express = require("express");
const router = express.Router();
const body_parser = require("body-parser");
const formidable = require("formidable");
const models = require("../../models");
const authentication = require("../../middleware/authentication");
const output_message = require("../../middleware/output_message").output_message;
//const multer_configuration = require("../../middleware/multer_configuration");

router.use(body_parser.urlencoded({ extended: true }));
router.use(body_parser.json());
router.use(authentication.authenticate_session);

router.get("/list/:user_email", (req, res) => {
    // Get id list of room requests

    var where_statement = {};

    if(Object.keys(req.params).length > 0) {
        where_statement = {
            user_id: req.params.user_email,
        }
    }

    models.RoomRequest.findAll({
        attributes: ["id"],
        where: where_statement,
    })
    .then(r => {
        if(r.length === 0) {
            res.end();
            return;
        }
        console.log(r.map(request => request.dataValues.id));
        res.json(r.map(request => request.dataValues.id));
    })
    .catch(err => console.log(err));
});

router.post("/", (req, res) => {
    // Create new room request

    let message = "Recieved form submission to request " + "Room".bold;
    output_message("info", message);

    models.Room.findAll({
        attributes: ["id"],
        where: {
            id: req.body.room_id,
        },
    })
    .then(r => {
        if(r.length === 0) {
            res.end();
            return;
        }
        req.body.user_id = req.session.user;
        req.body.status = "Pendente";
    
        models.RoomRequest.create(req.body)
        .then(data => {
            let message = "Successfully created new object " + "room request".bold;
            output_message("success", message);
        })
        .catch(err => {
            output_message("error", "Failed to create new " + "room request".bold + ". More details below.");
            console.log(err);
        });
    });
});

router.get("/info/:request_id", (req, res) => {
    // Get room request info

    var request_id = req.params.request_id;

    models.RoomRequest.findAll({
        attributes: ["day", "time_start", "time_end", "status", "room_id", "user_id"],
        where: {
            id: request_id,
        },
    })
    .then(room_request => {
        if(room_request.length === 0) {
            res.sendStatus(404);
            res.end();
            return;
        }

        var room_id = room_request[0].dataValues.room_id;
        var user_id = room_request[0].dataValues.user_id;
        var room_user_data = {};

        room_user_data["request"] = room_request[0].dataValues;

        models.Room.findAll({
            attributes: ["name", "description"],
            where: {
                id: room_id,
            },
        })
        .then(room => {
            if(room.length === 0) {
                res.sendStatus(404);
                res.end();
                return;
            }
            
            room_user_data["room"] = room[0].dataValues;

            models.User.findAll({
                attributes: ["name", "class"],
                where: {
                    email: user_id,
                },
            })
            .then(user => {
                if(user.length === 0) {
                    res.sendStatus(404);
                    res.end();
                    return;
                }
                
                room_user_data["user"] = user[0].dataValues;
                res.json(room_user_data);
            })
            .catch(err => {
                console.error(err);
                res.sendStatus(500);
                res.end();
            });
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
            res.end();
        });
    })
    .catch(err => {
        let msg = "Failed to get " + "Room Request".bold + " data from DB. More details below:";
        output_message("error", msg);
        console.error(err);
        res.sendStatus(500);
        res.end();
    });
});

router.put("/:request_id", (req, res) => {
    // Change room request status

    var request_id = req.params.request_id;

    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if(err) {
            let msg = "Failed to parse received info. More details below:";
            output_message("error", msg);
            console.log(err);
            res.end();
            return;
        }
        console.log(fields);
        models.RoomRequest.update({
            status: fields.status,
        }, {
            where: {
                id: request_id
            },
        })
        .catch(err => {
            let msg = "Error updating " + "Room Request".bold + " status. More details below:";
            output_message("error", msg);
            console.log(err);
        });

        res.end();
    });
});

module.exports = router;