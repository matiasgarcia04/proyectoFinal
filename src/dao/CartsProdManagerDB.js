import cartModel from "./models/carts.model.js";

class CartManagerDB {
    // obtener la coleccion
    async get(){
        return await cartModel.find({})
        }
    // obtener un carrito especifico
    async getByID(uid){
          return await cartModel.findOne({_id: uid})
          }
     
// crear un carrito vacio
    async create() {
        const cart = await cartModel.create({
          products: []
        });
        return cart;
      }

      
    // actualizar productos del carrito elegido
    async add({ product: _id, quantity: quantity }) {
        const cart = await cartModel.findByIdAndUpdate({ product: _id, quantity: quantity });
        return cart;
      }


    async update(uid){
        return await cartModel.findByIdAndUpdate({_id: uid})

    }


    // borrar carrito
    async delete(uid){
        return await cartModel.findByIdAndDelete({_id: uid})
    }

    async getByIDLean(uid){
      return await cartModel.findOne({_id: uid}).lean();
      }


    // Delete api/carts/:cid/products/:pid
    async deleteItem(cid, pid){
      try {
          return await this.Cart.findOneAndUpdate(
              { _id: cid },
              { $pull: { products: { product: pid } } },
              { new: true }
          )
      } catch (error) {
          return new Error('Error deleting product from cart'+error)
      }
  }
    // vaciar carrito
    async delete(cid){
      try {
          // console.log(cid)
          return await cartModel.findOneAndUpdate(
              { _id: cid },
              { $set: { products: [] } },
              { new: true }
          )
      } catch (error) {
          return new Error('Error deleting cart'+ error)
      }
  }
    


}


// class CartManagerDB {
//   // obtener la coleccion
//   async getCarts(){
//       return await cartModel.find({})
//       }
//   // obtener un carrito especifico
//       async getCartbyID(uid){
//         return await cartModel.findOne({_id: uid})
//         }
   
// // crear un carrito vacio
//   async createCart() {
//       const cart = await cartModel.create({
//         products: []
//       });
//       return cart;
//     }

    
//   // actualizar productos del carrito elegido
//   async addCart({ product: _id, quantity: quantity }) {
//       const cart = await cartModel.findByIdAndUpdate({ product: _id, quantity: quantity });
//       return cart;
//     }
//   async updateCart(uid){
//       return await cartModel.findByIdAndUpdate({_id: uid})

//   }


//   // borrar carrito
//   async deleteCart(uid){
//       return await cartModel.findByIdAndDelete({_id: uid})
//   }

//   async getCartbyIDLean(uid){
//     return await cartModel.findOne({_id: uid}).lean();
//     }
// }




export default CartManagerDB