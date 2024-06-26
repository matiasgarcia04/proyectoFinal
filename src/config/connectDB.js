import mongoose from "mongoose"
import configObjet from "./dotenv.js"
import {logger} from "../utils/logger.js"

const connectDB = async () => {
    try {
        await mongoose.connect(configObjet.mongoURL)
      
        logger.info('Conectado a base de datos')        
    } catch (error) {
        logger.error(error)
    }
}

export default connectDB;