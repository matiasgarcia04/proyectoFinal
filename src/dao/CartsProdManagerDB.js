import cartModel from "./models/carts.model.js";

class CartManagerDB {
    // obtener la coleccion
    async getCarts(){
        return await cartModel.find({})
        }
    // obtener un carrito especifico
        async getCartbyID(uid){
          return await cartModel.findOne({_id: uid})
          }
     
// crear un carrito vacio
    async createCart() {
        const cart = await cartModel.create({
          products: []
        });
        return cart;
      }

      
    // actualizar productos del carrito elegido
    async addCart({ product: _id, quantity: quantity }) {
        const cart = await cartModel.findByIdAndUpdate({ product: _id, quantity: quantity });
        return cart;
      }
    async updateCart(uid){
        return await cartModel.findByIdAndUpdate({_id: uid})

    }


    // borrar carrito
    async deleteCart(uid){
        return await cartModel.findByIdAndDelete({_id: uid})
    }

    async getCartbyIDLean(uid){
      return await cartModel.findOne({_id: uid}).lean();
      }
}
export default CartManagerDB