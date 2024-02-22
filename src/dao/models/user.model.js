import mongoose from "mongoose";
import { Schema } from "mongoose";


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
    cart:{
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    role:{ 
        type: String,
        enum: ['USER','USER_PREMIUM','ADMIN'],
        default: 'USER'
    },
}) 

const userModel = mongoose.model(usersCollection, usertSchema)

export default userModel