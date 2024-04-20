import nodemailer from "nodemailer";
import configObjet from "../config/dotenv.js";


const transport = nodemailer.createTransport({
    service: 'gmail',
    port:587,
    auth:{
        user: configObjet.gmail,
        pass: configObjet.passnodemailer
    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendMail = async (to,subject,html)=> await transport.sendMail({
    from: 'codertest<matiasgustavogarcia.04@gmail.com>',
    to,
    subject,
    html
   
})

export {sendMail}
