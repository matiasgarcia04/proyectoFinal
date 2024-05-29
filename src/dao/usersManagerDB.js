import userModel from "./models/user.model.js";


class userManagerDB{
    async get(){
        return await userModel.find({})
    }
    async getByID(uid){
        return await userModel.findOne({_id: uid})
    }
    // async getUserB({password: password,email:email}){
    //     return await userModel.findOne({password: password,email:email})
    // }
    async getByEmail({email:email}){
        return await userModel.findOne({email:email})
    }
    // sin casociar carrito al usuario----------------------------------------------
    // async createUser({first_name:first_name,last_name:last_name,email:email, age:age, password:password }){
        
    //     return await userModel.create({first_name:first_name,last_name:last_name,email:email, age:age, password:password })
    // }
    // asociando carrito al usuario--------------------------
    async create ({first_name:first_name,last_name:last_name,email:email, age:age, password:password,cart:cart,documents:documents,last_connection:last_connection }){
        
        return await userModel.create({first_name:first_name,last_name:last_name,email:email, age:age, password:password, cart:cart,documents:documents,last_connection:last_connection })
    }
    // sin nueva actualizacion
    // async create ({first_name:first_name,last_name:last_name,email:email, age:age, password:password,cart:cart }){
        
    //     return await userModel.create({first_name:first_name,last_name:last_name,email:email, age:age, password:password, cart:cart })
    // }
    // async update(uid, {filter}) {
    //     return await userModel.findByIdAndUpdate(uid, {filter}, {new: true});
    //   }
}


// class userManagerDB{
//     async getUsers(){
//         return await userModel.find({})
//     }
//     async getUser(uid){
//         return await userModel.findOne({_id: uid})
//     }
//     // async getUserB({password: password,email:email}){
//     //     return await userModel.findOne({password: password,email:email})
//     // }
//     async getUserByEmail({email:email}){
//         return await userModel.findOne({email:email})
//     }
//     // sin casociar carrito al usuario----------------------------------------------
//     // async createUser({first_name:first_name,last_name:last_name,email:email, age:age, password:password }){
        
//     //     return await userModel.create({first_name:first_name,last_name:last_name,email:email, age:age, password:password })
//     // }
//     // asociando carrito al usuario--------------------------
//     async createUser({first_name:first_name,last_name:last_name,email:email, age:age, password:password,cart:cart }){
        
//         return await userModel.create({first_name:first_name,last_name:last_name,email:email, age:age, password:password, cart:cart })
//     }
// }


export default userManagerDB;