const nodemailer = require('nodemailer');
const db = require('../models/index');
const createError = require('http-errors');

function validate_email(email) {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
}

async function contact(req, res, next){
    try {
        let email = req.body.email;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let message = req.body.message;
        if (!message.length || message.length < 1 || !validate_email(email)){
            next(createError(500, "Missing or invalid details"));
            return;
        }    
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODE_EMAIL,
                pass: process.env.NODE_EMAIL_PASS,
            }
        });
        
        let mailOptions = {
            from: process.env.NODE_EMAIL,
            to: process.env.NODE_EMAIL,
            subject: 'Thank you ' + firstName + ' ' + lastName + ' for contacting',
            text: message,
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.json({"error": "something went wrong"});
            }
            else {
                console.log(info);
            }
        });
        res.status(200).json({"message": "Your message has been registered"});
        return;
    }
    catch (err){
        console.log(err);
        next(createError(500, "Something went wrong"));
    }
}

module.exports = {
    contact,
};
