import userModel from "./models/user.model.js";


class userManagerDB{
    async get(){
        return await userModel.find({})
    }
    async getByID(uid){
        return await userModel.findOne({_id: uid})
    }

    async getByEmail({email:email}){
        return await userModel.findOne({email:email})
    }
    
    async create ({first_name:first_name,last_name:last_name,email:email, age:age, password:password,cart:cart,documents:documents,last_connection:last_connection }){
        
        return await userModel.create({first_name:first_name,last_name:last_name,email:email, age:age, password:password, cart:cart,documents:documents,last_connection:last_connection })
    }
   
}

export default userManagerDB;