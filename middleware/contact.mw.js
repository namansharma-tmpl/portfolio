const nodemailer = require('nodemailer');

function validate_email(email) {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
}



async function send_mail(body){
    let email = body.email;
    let firstName = body.firstName;
    let lastName = body.lastName;
    let message = body.message;
    if (!message.length || message.length < 1 || !validate_email(email)){
        return {status: 400};
    }    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sherlockjames001@gmail.com',
            pass: 'zwnaiozyuqbvkmqk',
        }
    });
    
    let mailOptions = {
        from: 'sherlockjames001@gmail.com',
        to: 'sherlockjames001@gmail.com',
        subject: 'Thank you ' + firstName + ' ' + lastName + ' for contacting',
        text: message,
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return {status: 500};
        }
        else {
            console.log(info);
        }
    });
    return {status: 200, result: "Your message has been registered"};  
}

module.exports = {
    send_mail,
};