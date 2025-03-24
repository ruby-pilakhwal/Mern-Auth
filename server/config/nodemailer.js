import nodemailer from 'nodemailer';


//create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com', //SMTP server
    port: 587, //SMTP port
    auth: {
        user: process.env.SMTP_USER, //SMTP username
        pass: process.env.SMTP_PASSWORD, //SMTP password
    },
    tls: {
        rejectUnauthorized: false // This will ignore self-signed certificate errors
    }
    
});


export default transporter;
    
