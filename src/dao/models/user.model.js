import mongoose from "mongoose";



const usersCollection = 'users'

const usertSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
    },
    age: Number,
    password: String,
}) 

const userModel = mongoose.model(usersCollection, usertSchema)

export default userModel