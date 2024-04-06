import winston from "winston";
import configObjet from "../config/dotenv.js";

const levelsOpt = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5
    },
    // black, red, green, yellow, blue, magenta, cyan, white, gray, grey.
    colors:{
        fatal:'red',
        error:'magenta',
        warning:'yellow',
        info:'blue',
        http:'cyan',
        debug:'green'
    }
}


const logger = winston.createLogger({
    levels: levelsOpt.levels,
    transports: [
        new winston.transports.Console({
            level: configObjet.node_env === 'production' ? 'info' : 'debug',
            format: winston.format.combine(winston.format.colorize({colors: levelsOpt.colors}),
            winston.format.simple()
        )
        }),
        new winston.transports.File({
            filename:'./errors.log',
            level:'error',
            format: winston.format.simple()
    })
    ]
})

const addlogger=(req, res,next) =>{
    req.logger=logger
    req.logger.debug(`${req.method} en ${req.url}-${new Date().toLocaleTimeString()}`)
    next()
}

export {addlogger, logger};