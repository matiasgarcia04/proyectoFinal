import mongoose from "mongoose"
import configObjet from "./dotenv.js"

const connectDB = async () => {
    try {
        await mongoose.connect(configObjet.mongoURL)
        console.log('Conectado a base de datos')        
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;