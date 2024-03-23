import ticketModel from "./models/ticket.model.js";


class purchaseManagerDB {
    async get(){
        return await ticketModel.find({});
    }

    async getByID(tid){
        return await ticketModel.findById({_id: tid});
    }

    async create({code:code,amount: amount,purchaser:purchaser}){
            return await ticketModel.create({code:code,amount: amount,purchaser:purchaser});
    }
    
    async update(tid, {code,amount,purchaser}){
        return await ticketModel.findByIdAndUpdate(tid, {code,amount,purchaser},{new:true});
    }

    async delete(tid){
        return await ticketModel.findByIdAndDelete({_id: tid});
    }
    
}


export default purchaseManagerDB
