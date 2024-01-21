import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://matias:coderhouse@coderhouse.rbewc2j.mongodb.net/ecommerce?retryWrites=true&w=majority')
        console.log('Conectado a base de datos')        
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;