import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const productsCollection = 'products'
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        index:true
        },
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number,
    owner:{
        type:String,
        default: "ADMIN"
    }
}) 

productSchema.plugin(mongoosePaginate)

const prodModel = mongoose.model(productsCollection, productSchema)

export default prodModel