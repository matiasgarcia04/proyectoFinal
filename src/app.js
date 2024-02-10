import express from "express";
import _dirname from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productsrouter from "./routers/products.routers.js";
import cartsrouters from "./routers/carts.routers.js";
import connectDB from "./config/connectDB.js";
import ProdManagerDB from "./dao/ProdManagerDB.js";
import mongoose from "mongoose";
import chatManagerDB from "./dao/chatManagerDB.js";
import CartManagerDB from "./dao/CartsProdManagerDB.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import sessionrouter from "./routers/session.routers.js";
import MongoStore from "connect-mongo";
import viewsRouter from "./routers/views.routers.js";


const newProdDB = new ProdManagerDB();
const chatDB = new chatManagerDB();
const newCartManager= new CartManagerDB();

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
app.use(cookieParser("coderhouse"));
app.use(session({
  store:MongoStore.create({
    mongoUrl:'mongodb+srv://matias:coderhouse@coderhouse.rbewc2j.mongodb.net/ecommerce?retryWrites=true&w=majority',
    mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true},
    ttl:15,
  }),
  secret:'secret',
  resave: true,
  saveUninitialized:true
}))


app.engine('handlebars', handlebars.engine());
app.set('views',_dirname+'/views');
app.set('view engine', 'handlebars');

app.get('/', (req,res)=>{
  res.render('index',{})});

app.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const pag = parseInt(req.query.pag) || 1;
  const sort = req.query.sort === 'asc' ? 1 : req.query.sort === 'desc' ? -1 : '';
  const {
            docs,
            hasPrevPage, 
            hasNextPage,
            prevPage, 
            nextPage,
            page 
        } =await newProdDB.getProdPag(sort,limit, pag);
  if (req.session.user) {
    const { name } = req.session.user;

    res.render('products', {
        products: docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page,
        userName: name
    });
} else {
    
    res.render('products', {
        products: docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
    });
}});

app.get('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const {title,description,price,stock,code} = await newProdDB.getProductlean({_id:productId});
  const product= {title,description,price,stock,code}
  res.render('productdetail', { product });

});

app.get("/cart/:cid", async(req, res) =>{
  try {
      const {cid}= req.params;
      const cart = await newCartManager.getCartbyIDLean({_id:cid})
      const products= cart.products;
      res.render('cart', { products }); 
  } catch (error) {
          res.status(500).send('error')
         console.log(error)
      }
})



app.get('/home', async (req, res) => {
    const products = await newProdDB.getProductsLean();
    res.render('home', { products });
  });


app.get('/realtimeproducts', async (req, res) => {
    const products = await newProdDB.getProductsLean();
    res.render('realtimeproducts', { products });
  });


  app.post('/realtimeproducts', async (req, res, next) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        await newProdDB.createProduct({ title, description, price, thumbnail, code, stock });
            const products = await newProdDB.getProductsLean();
                 res.status(201).send({ products });
    } catch (error) {
            next(error);
         }
});

app.use("/",viewsRouter);
app.use("/api/products", productsrouter);
app.use("/api/carts", cartsrouters);
app.use("/api/session",sessionrouter)



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