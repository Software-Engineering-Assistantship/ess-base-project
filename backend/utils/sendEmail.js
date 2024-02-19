const nodemailer = require("nodemailer")

const sendEmail = async (subject, message, send_to) => {
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", 
        port: "587",
        auth: {
            user: "almocin.ess@outlook.com",
            pass: "almocin.email"
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const options = {
        from: "almocin.ess@outlook.com",
        to: send_to,
        replyTo: "almocin.ess@outlook.com",
        subject: subject,
        html: message
    }

    let error = false

    transporter.sendMail(options, function(err, info){
        if (err){
            error = true
        } 
    })
    
    if(error){
        return "error"
    } else {
        return "success"
    }
}

module.exports = sendEmail