import cartModel from "./models/carts.model.js";

class CartManagerDB {
    async getCarts(){
        return await cartModel.find({})
    }
    async getCartbyID(uid){
        return await cartModel.findOne({_id: uid})
    }
    async createCart({ product: _id, quantity: quantity }) {
        const cart = await cartModel.create({
          products: [{ product: _id, quantity: quantity }]
        });
        return cart;
      }


    async deleteProduct(uid){
        return await cartModel.findByIdAndDelete({_id: uid})
    }
}

export default CartManagerDB