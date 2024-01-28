import cartModel from "./models/carts.model.js";

class CartManagerDB {
    // obtener la coleccion
    async getCarts(){
        return await cartModel.find({})
        }
    // obtener un carrito especifico
    async getCartbyID(uid){
        return await cartModel.find({_id: uid})
        }
        // async getCartbyID(uid){
        //   return await cartModel.findOne({_id: uid})
        //   }
// crear un carrito vacio
    async createCart() {
        const cart = await cartModel.create({
          products: []
        });
        return cart;
      }

      
    // agreagar productos al carrito elegido
    async addCart({ product: _id, quantity: quantity }) {
        const cart = await cartModel.findByIdAndUpdate({ product: _id, quantity: quantity });
        return cart;
      }
    async updateCart(uid){
        return await cartModel.findByIdAndUpdate({_id: uid})

    }


    // borrar carrito
    async deleteProduct(uid){
        return await cartModel.findByIdAndDelete({_id: uid})
    }
}
export default CartManagerDB