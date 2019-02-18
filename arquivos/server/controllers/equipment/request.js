const express = require("express");
const router = express.Router();
const body_parser = require("body-parser");
const formidable = require("formidable");
const models = require("../../models");
const authentication = require("../../middleware/authentication");
const output_message = require("../../common_modules/output_message").output_message;
const order_filter_request = require("../../common_modules/filter_order_requests").order_filter_request;
const email = require("../../common_modules/email");

router.use(body_parser.urlencoded({ extended: true }));
router.use(body_parser.json());
router.use(authentication.authenticate_session);

router.post("/", (req, res) => {
    // Create new Equipment Request
    
    let message = "Recieved form submission to request " + "Equipment".bold;
    output_message("info", message);

    var rejected_equipment = [];
    var accepted_equipment = [];

    req.body.requested_equipment.map(eq_id => {
        var req_body = {};
        Object.assign(req_body, req.body);

        models.Material.findAll({
            attributes: ["name"],
            where: {
                id: eq_id,
            },
        })
        .then(r => {
            if(r.length === 0) {
                res.end();
                return;
            }

            models.RequestMaterial.findAll({
                attributes: ["id", "material_id"],
                where: {
                    $or: [
                        {status: "Pendente"},
                        {status: "Aceite"},
                    ],
                    $and: {
                        material_id: eq_id,
                        $or: [
                            {
                                day_start: {
                                    $between: [req_body.day_start, req_body.day_end],
                                },
                            },
                            {
                                day_end: {
                                    $between: [req_body.day_start, req_body.day_end],
                                },
                            },
                            {
                                $and: {
                                    day_start: {
                                        $lte: req.body.day_start,
                                    },
                                    day_end: {
                                        $gte: req.body.day_end,
                                    },
                                },
                            },
                            {
                                time_start: {
                                    $between: [req_body.time_start, req_body.time_end],
                                },
                            },
                            {
                                time_end: {
                                    $between: [req_body.time_start, req_body.time_end],
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
                    r.forEach(result => {
                        req_body.requested_equipment = req_body.requested_equipment.filter(eq => eq !== result.dataValues.material_id);

                        models.Material.findAll({
                            attributes: ["name"],
                            where: {
                                id: result.dataValues.material_id,
                            },
                        })
                        .then(r => {
                            rejected_equipment.push(r.dataValues.name);
                        })
                        .catch(err => {
                            output_message("error", "Failed to run query on database. More details below:\n" + err);
                        });
                    });

                    email.send("notification", "deny", req.session.user);

                    res.sendStatus(205);
                    return;
                }

                accepted_equipment = req_body.requested_equipment;
                req_body.material_id = eq_id;
                req_body.user_id = req.session.user;
                req_body.status = "Pendente";

                models.RequestMaterial.create(req_body)
                .then(data => {
                    email.send("notification", "accept", req.session.user);

                    let message = "Successfully created new object " + "equipment request".bold;
                    output_message("success", message);
                    res.end();
                })
                .catch(err => {
                    output_message("error", "Failed to create object " + "room request".bold + ". More details below:\n" + err);
                    res.end();
                })
            })
            .catch(err => {
                output_message("error", "Failed to run query on database. More details below:\n" + err);
            });
        })
        .catch(err => {
            output_message("error", "Failed to run query on database. More details below:\n" + err);
        });
    });
});

router.all("/list/:limit?/:user_email?", (req, res) => {
    // Get id list of equipment requests

    var order_filter = order_filter_request(req, res);
    var limit;

    if(req.params.limit != 0) {
        limit = req.params.limit;
    }
    
    models.RequestMaterial.findAll({
        attributes: ["id"],
        where: order_filter.where,
        order: order_filter.order,
        limit: limit,
    })
    .then(r => {
        res.json(r.map(request => request.dataValues.id));
    })
    .catch(err => output_message("error", "Failed to run query on database. More details below:\n" + err));
})

router.get("/info/:request_id", (req, res) => {
    // Get equipment requests info

    var request_id = req.params.request_id;

    models.RequestMaterial.findAll({
        attributes: ["day_start", "day_end", "time_start", "time_end", "status", "material_id", "user_id"],
        where: {
            id: request_id,
        },
    })
    .then(equipment_request => {
        if(equipment_request.length === 0) {
            res.sendStatus(404);
            res.end();
            return;
        }

        var material_id = equipment_request[0].dataValues.material_id;
        var user_id = equipment_request[0].dataValues.user_id;
        var equipment_user_data = {};

        equipment_user_data["request"] = equipment_request[0].dataValues;

        models.Material.findAll({
            attributes: ["name", "description"],
            where: {
                id: material_id,
            },
        })
        .then(equipment => {
            if(equipment.length === 0) {
                res.sendStatus(404);
                res.end();
                return;
            }
            
            equipment_user_data["equipment"] = equipment[0].dataValues;

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
                
                equipment_user_data["user"] = user[0].dataValues;
                res.json(equipment_user_data);
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
        let msg = "Failed to get " + "Equipment Request".bold + " data from DB. More details below:";
        output_message("error", msg);
        console.error(err);
        res.sendStatus(500);
        res.end();
    });
});

router.put("/:request_id", authentication.authenticate_admin, (req, res) => {
    // Change equipment request status
    
    var request_id = req.params.request_id;

    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if(err) {
            output_message("error", "Failed to parse received info. More details below:\n" + err);
            res.end();
            return;
        }

        models.RequestMaterial.update({
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

            email.send("notification", "accept", req.session.user);
        })
        .catch(err => {
            output_message("error", "Error updating " + "Equipment Request".bold + " status. More details below:\n" + err);
        });

        res.end();
    });
});

module.exports = router;