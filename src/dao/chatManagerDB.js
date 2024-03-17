import chatModel from "./models/messages.model.js"

class chatManagerDB {
    async get(){
        return await chatModel.find({})
    }
    async getByID(uid){
        return await chatModel.findOne({_id: uid})
    }
    async create({user:user, message:message}){
        
        return await chatModel.create({user:user, message:message});
        
    }
    async delete(uid){
        return await chatModel.findByIdAndDelete({_id: uid})
    }
    async getLean(){
        return await chatModel.find({}).lean()
        
    }
}

// class chatManagerDB {
//     async getChat(){
//         return await chatModel.find({})
//     }
//     async getChat(uid){
//         return await chatModel.findOne({_id: uid})
//     }
//     async createChat({user:user, message:message}){
        
//         return await chatModel.create({user:user, message:message});
        
//     }
//     async deleteChat(uid){
//         return await chatModel.findByIdAndDelete({_id: uid})
//     }
//     async getChatLean(){
//         return await chatModel.find({}).lean()
        
//     }
// }

export default chatManagerDB