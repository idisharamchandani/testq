"use strict";
const nodemailer = require("nodemailer");
async function main() {
    var transporter = nodemailer.createTransport({
        host: "mail.mailtest.radixweb.net", // hostname
        secure: true,
        port: 465,
        auth: {
            user: "testphp@mailtest.radixweb.net",
            pass: "Radixweb8"
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "dchandani2000@gmail.com", // sender address
        to: "dirchandani08@gmail.com", // list of receivers
        subject: "Nodemailer Practice Mail", // Subject line
        text: "Good Afternoon your today's task:", // plain text body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
main().catch(console.error);