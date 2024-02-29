import dotenv from "dotenv";
import program from "./commander.js";

const { mode } = program.opts()
dotenv.config(
    {
        path: mode === 'test' ? './.env.test' : './.env'
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
    adminPassword: process.env.ADMIN_PASSWORD

}

export default configObjet