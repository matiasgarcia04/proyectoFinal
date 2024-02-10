import userModel from "./models/user.model.js";


class userManagerDB{
    async getUsers(){
        return await userModel.find({})
    }
    async getUser(uid){
        return await userModel.findOne({_id: uid})
    }
    async getUserB({password: password,email:email}){
        return await userModel.findOne({password: password,email:email})
    }
    async getUserByEmail({email:email}){
        return await userModel.findOne({email:email})
    }
    async createUser({first_name:first_name,last_name:last_name,email:email, age:age, password:password }){
        
        return await userModel.create({first_name:first_name,last_name:last_name,email:email, age:age, password:password })
    }
}


export default userManagerDB;