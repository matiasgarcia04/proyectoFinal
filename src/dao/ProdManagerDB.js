
import prodModel from "./models/product.model.js"

class ProdManagerDB {
    async getProducts(){
        return await prodModel.find({})
    }
    async getProduct(uid){
        return await prodModel.findOne({_id: uid})
    }
    async createProduct({title:title, description: description,price: price, thumbnail:thumbnail, code: code, stock:stock}){
        
        return await prodModel.create({title:title, description: description,price: price, thumbnail:thumbnail, code: code, stock:stock});
        
    }
    async updateProduct(uid, {title, description, price, thumbnail, code, stock}) {
        return await prodModel.findByIdAndUpdate(uid, {title, description, price, thumbnail, code, stock}, {new: true});
      }
    async deleteProduct(uid){
        return await prodModel.findByIdAndDelete({_id: uid})
    }
    async getProductsLean(){
        return await prodModel.find({}).lean()
        
    }
    async deleteProductbyid(uid){
        return await prodModel.findOneAndDelete({_id: uid})}
    
        async getProductlean(uid){
            return await prodModel.findOne({_id: uid}).lean()
        }


    async getProdPag(sort,limit,pagina,){ 
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