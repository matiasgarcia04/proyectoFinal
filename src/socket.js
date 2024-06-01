
import mongoose from "mongoose";
import { prodDB } from "./services/services.js";


export default (socketServer)=>
{socketServer.on('connection',socket=>{
    console.log("cliente de prueba");
    const mostrarprod = async()=> {
      const prod= await prodDB.getLean();
      socketServer.emit('server:productlist',prod);

    }
    socket.on('newProduct',async (data)=>{

      const newProd= await prodDB.create(data);

      newProd.save();
      const prodFromDB = await prodDB.getByID({ _id: newProd._id });
      mostrarprod();
      console.log(newProd)
      socketServer.emit('server:render',prodFromDB)

    })
    socket.on('deleteProduct', async (cardId) => {
      try {
  mongoose.Types.ObjectId.isValid(cardId);
        const deletedProduct = await prodDB.deleteByID({ _id: cardId });
        console.log(`Product with id ${cardId} deleted successfully.`);
      } catch (error) {
        console.error(`Error deleting product with id ${cardId}: ${error.message}`);
      }
    });

  });}