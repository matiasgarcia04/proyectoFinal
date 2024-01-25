import express from "express";
import _dirname from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productsrouter from "./routers/products.routers.js";
import cartsrouters from "./routers/carts.routers.js";
// import fs from "fs";
// import ProductManager from "./ProductManager.js";
import connectDB from "./config/connectDB.js";
import ProdManagerDB from "./dao/ProdManagerDB.js";
import mongoose from "mongoose";
import chatManagerDB from "./dao/chatManagerDB.js";

// const newManager = new ProductManager();
const newProdDB = new ProdManagerDB();
const chatDB = new chatManagerDB();

const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
const socketServer = new Server(httpServer);
connectDB()


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(_dirname+'/public'));


app.engine('handlebars', handlebars.engine());
app.set('views',_dirname+'/views');
app.set('view engine', 'handlebars');

app.get('/', (req,res)=>{
  res.render('index',{})});



app.get('/home', async (req, res) => {
    const products = await newProdDB.getProductsLean();
    res.render('home', { products });
  });


app.get('/realtimeproducts', async (req, res) => {
    const products = await newProdDB.getProductsLean();
    res.render('realTimeProducts', { products });
  });


  app.post('/realtimeproducts', async (req, res, next) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        await newProdDB.createProduct({ title, description, price, thumbnail, code, stock });
            const products = await newProdDB.getProductsLean();
            // socketServer.emit('newProduct', { products });
                 res.status(201).send({ products });
    } catch (error) {
            next(error);
         }
});

app.use("/api/products", productsrouter);
app.use("/api/carts", cartsrouters);

// --------------------------------message-------------------------
app.get('/chat', (req, res) => {
  chatDB.getChatLean().then((messages) => {
    res.render('chat', { messages });
  }).catch((error) => {
    console.error('Error al buscar los mensajes:', error);
    res.status(500).send('Error interno del servidor');
  });
});
app.post('/chat',async (req, res) => {
  
  const message = chatDB.createChat({user:req.body.user, message:req.body.message});
  message.then(() => {
    res.redirect('/chat');
  }).catch((error) => {
    console.error('Error al guardar el mensaje:', error);
    res.status(500).send('Error interno del servidor');
  });
});


// -------------------------------socket-------------------

socketServer.on('connection',socket=>{
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

});




// ------------------------------------ filesystem------------------------------------

// app.get('/', (req,res)=>{
//   res.render('index',{})});



// app.get('/home', (req, res) => {
//     const products = JSON.parse(fs.readFileSync('src/mockProducts/Products.Json', 'utf8'));
//     res.render('home', { products });
//   });


// app.get('/realtimeproducts', (req, res) => {
//     const products = JSON.parse(fs.readFileSync('src/mockProducts/Products.Json', 'utf8'));
//     res.render('realTimeProducts', { products });
//     socketServer.emit('newProduct', { products });
//   });


//   app.post('/realtimeproducts', async (req, res, next) => {
//     try {
//         const { title, description, price, thumbnail, code, stock } = req.body;
//             await newManager.addProduct(title, description, price, thumbnail, code, stock);
//             const products = await newManager.getProducts();
//             socketServer.emit('newProduct', { products });
//                  res.status(201).send({ products });
//     } catch (error) {
//             next(error);
//          }
// });

// app.use("/api/products", productsrouter);
// app.use("/api/carts", cartsrouters);


// socketServer.on('connection',socket=>{
//   console.log("cliente conectado")
//   socket.on('newProduct', (product) => {
//     const products = JSON.parse(fs.readFileSync('src/mockProducts/Products.Json', 'utf8'));
//     const exist = products.some((p)=>p.code===product.code);
//     if(!exist){
//       products.push(product);
//     fs.writeFileSync('src/mockProducts/Products.Json', JSON.stringify(products,null, 2));
//     socketServer.emit('newProduct', { products });
//     }
//   });
//   socket.on('deleteProduct', (data) => {
//     const products = JSON.parse(fs.readFileSync('src/mockProducts/Products.Json', 'utf8'));
//     const index = products.findIndex((p) => p.id === data.id);
//     if (index !== -1) {
//       products.splice(index, 1);
//       fs.writeFileSync('src/mockProducts/Products.Json', JSON.stringify(products, null, 2));
//       socketServer.emit('deleteProduct', { id: data.id });
//     }
//   });
// })