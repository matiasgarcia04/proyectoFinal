
import prodModel from "./models/product.model.js"

class ProdManagerDB {
    async get(){
        return await prodModel.find({})
    }
    async getByID(uid){
        return await prodModel.findOne({_id: uid})
    }
    async create({title:title, description: description,price: price, thumbnail:thumbnail, code: code, stock:stock}){
        
        return await prodModel.create({title:title, description: description,price: price, thumbnail:thumbnail, code: code, stock:stock});
        
    }
    async update(uid, {title, description, price, thumbnail, code, stock}) {
        return await prodModel.findByIdAndUpdate(uid, {title, description, price, thumbnail, code, stock}, {new: true});
      }
    async delete(uid){
        return await prodModel.findByIdAndDelete({_id: uid})
    }
    async getLean(){
        return await prodModel.find({}).lean()
        
    }
    async deleteByID(uid){
        return await prodModel.findOneAndDelete({_id: uid})}
    
    async getByIDlean(uid){
            return await prodModel.findOne({_id: uid}).lean()
        }


    async paginate(sort,limit,pagina,){ 
        const options = {
            sort: sort ? { price: sort } : {},
            limit: limit,
            page: pagina,
            lean:true
            
        };
         return await prodModel.paginate({}, options)
        }
    
}

export default ProdManagerDB