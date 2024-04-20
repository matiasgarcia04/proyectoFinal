import dotenv from "dotenv";
import program from "./commander.js";

const { mode } = program.opts()
dotenv.config(
    {
        path: mode === 'production' ? './.env.production' : './.env'
    }
);



const configObjet = {
    port: process.env.PORT,
    cookieParser: process.env.COOCKIEPARSER,
    mongoURL: process.env.MONGO_URL,
    sessionSecret: process.env.SESSION_SECRET,
    githubclientID: process.env.GITHUB_CLIENTID,
    githubClientSecret: process.env.GITHUB_CLIENTSECRET,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    node_env: process.env.NODE_ENV,
    gmail: process.env.GMAIL_USER_NODEMAILER,
    passnodemailer: process.env.GMAIL_PASS_NODEMAILER,
    private_key: process.env.PRIVATE_KEY


}

export default configObjet