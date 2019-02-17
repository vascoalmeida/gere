const express = require("express");
const router = express.Router();
const body_parser = require("body-parser");
const formidable = require("formidable");
const models = require("../../models");
const authentication = require("../../middleware/authentication");
const email = require("../../common_modules/email");
const output_message = require("../../common_modules/output_message").output_message;
const order_filter_request = require("../../common_modules/filter_order_requests").order_filter_request;

router.use(body_parser.urlencoded({ extended: true }));
router.use(body_parser.json());
router.use(authentication.authenticate_session);

router.post("/", (req, res) => {
    // Create new room request

    let message = "Recieved form submission to request " + "Room".bold;
    output_message("info", message);

    models.RoomRequest.findAll({
        attributes: ["day", "time_start", "time_end"],
        where: {
            day: req.body.day,
            $or: [
                {status: "Pendente"},
                {status: "Aceite"},
            ],
            $and: {
                room_id: req.body.room_id,
                $or: [
                    {
                        time_start: {
                            $between: [req.body.time_start, req.body.time_end],
                        },
                    },
                    {
                        time_end: {
                            $between: [req.body.time_start, req.body.time_end],
                        },
                    },
                    {
                        $and: {
                            time_start: {
                                $lte: req.body.time_start,
                            },
                            time_end: {
                                $gte: req.body.time_end,
                            },
                        },
                    },
                ],
            },
        },
    })
    .then(r => {
        if(r.length > 0) {
            email.send("notification", "deny", req.session.user);
            res.sendStatus(205);
            return;
        }

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
                email.send("notification", "accept", req.session.user);
                output_message("success", "Successfully created new object " + "room request".bold);
            })
            .catch(err => {
                output_message("error", "Failed to create object " + "room request".bold + ". More details below:\n" + err);
                res.end(); 
            });
        });
    })
    .then(() => {
        res.end();
    })
    .catch(err => {
        output_message("error", "Failed to create object " + "room request".bold + ". More details below:\n" + err);
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

        models.RoomRequest.update({
            status: fields.status,
        }, {
            where: {
                id: request_id
            },
        })
        .then(r => {
            if(fields.status !== "Aceite") {
                email.send("notification", "deny", req.session.user);
                return;
            } 

            email.send("notification", "deny", req.session.user);
        })
        .catch(err => {
            output_message("error", "Error updating " + "Room Request".bold + " status. More details below:\n" + err);
        });

        res.end();
    });
});

router.all("/list/:limit?/:user_email?", (req, res) => {
    // Get id list of room requests
    
    var order_filter = order_filter_request(req, res);
    var limit;

    if(req.params.limit != 0) {
        limit = req.params.limit;
    }

    models.RoomRequest.findAll({
        attributes: ["id"],
        where: order_filter.where,
        order: order_filter.order,
        limit: limit,
    })
    .then(r => {
        res.json(r.map(request => request.dataValues.id));
    })
    .catch(err => output_message("error", "Failed to run query on database. More details below:\n" + err));
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
        let msg = "Failed to get " + "Room Request".bold + " data from DB. More details below:\n" + err;
        output_message("error", msg);
        res.sendStatus(500);
        res.end();
    });
});

module.exports = router;