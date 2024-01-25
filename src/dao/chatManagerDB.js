import chatModel from "./models/messages.model.js"

class chatManagerDB {
    async getChat(){
        return await chatModel.find({})
    }
    async getChat(uid){
        return await chatModel.findOne({_id: uid})
    }
    async createChat({user:user, message:message}){
        
        return await chatModel.create({user:user, message:message});
        
    }
    async deleteChat(uid){
        return await chatModel.findByIdAndDelete({_id: uid})
    }
    async getChatLean(){
        return await chatModel.find({}).lean()
        
    }
}

export default chatManagerDB