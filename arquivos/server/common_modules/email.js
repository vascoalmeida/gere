const nodemailer = require("nodemailer");
const output_message = require("../common_modules/output_message").output_message;
const email_credentials = require("../credentials/email_credentials.json");
const fs = require("fs");

const email_text = {
    deny: {
        subject: "Pedido recusado",
        body: "request_denied.txt",
    },
    accept: {
        subject: "Pedido aceite",
        body: "request_accepted.txt",
    },
}

function send(email_type, message_type, receiver) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: email_credentials[email_type].address,
            pass: email_credentials[email_type].password,
        },
    });

    fs.readFile(__dirname + "/../email_messages/" + email_text[message_type].body, (err, data) => {
        if(err) {
            output_message("error", "Failed to read file " + email_text[message_type].body + ". More details below:\n" + err);
            return;
        }

        var email_opt = {
            from: email_credentials[email_type].address,
            to: receiver,
            subject: email_text[message_type].subject,
            text: data,
        }

        transporter.sendMail(email_opt, (err, info) => {
            if(err) {
                output_message("error", "Failed to send email to user. More details below:\n" + err);
                return;
            }

            output_message("success", "Successfully sent email to user. Aditional info below:\n" + info);
        });
    }); 
}

module.exports = {
    send: send,
}