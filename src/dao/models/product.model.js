import mongoose from "mongoose";


const productsCollection = 'products'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number
}) 

const prodModel = mongoose.model(productsCollection, productSchema)

export default prodModel