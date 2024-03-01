import ProdManagerDB from "./dao/ProdManagerDB.js";
import mongoose from "mongoose";


const newProdDB = new ProdManagerDB();

export default (socketServer)=>
{socketServer.on('connection',socket=>{
    console.log("cliente de prueba");
    const mostrarprod = async()=> {
      const prod= await newProdDB.getProductsLean();
      socketServer.emit('server:productlist',prod);
    }
    socket.on('newProduct',async (data)=>{
      const newProd= await newProdDB.createProduct(data);
      newProd.save();
      const prodFromDB = await newProdDB.getProduct({ _id: newProd._id });
      mostrarprod();
  
      socketServer.emit('server:render',prodFromDB)
  
    })
    socket.on('deleteProduct', async (cardId) => {
      try {
  mongoose.Types.ObjectId.isValid(cardId);
        const deletedProduct = await newProdDB.deleteProductbyid({ _id: cardId });
        console.log(`Product with id ${cardId} deleted successfully.`);
      } catch (error) {
        console.error(`Error deleting product with id ${cardId}: ${error.message}`);
      }
    });
  
  });}