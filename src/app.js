import express from "express";
import _dirname from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productsrouter from "./routers/products.routers.js";
import cartsrouters from "./routers/carts.routers.js";
import fs from "fs";
import ProductManager from "./ProductManager.js";

const newManager = new ProductManager();

const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
const socketServer = new Server(httpServer);




app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(_dirname+'/public'));


app.engine('handlebars', handlebars.engine());
app.set('views',_dirname+'/views');
app.set('view engine', 'handlebars');

app.get('/', (req,res)=>{
  res.render('index',{})});


// aca empieza socket lado server-------------------------------------------------
app.get('/home', (req, res) => {
    const products = JSON.parse(fs.readFileSync('src/mockProducts/Products.Json', 'utf8'));
    res.render('home', { products });
  });


app.get('/realtimeproducts', (req, res) => {
    const products = JSON.parse(fs.readFileSync('src/mockProducts/Products.Json', 'utf8'));
    res.render('realTimeProducts', { products });
    socketServer.emit('newProduct', { products });
  });


  app.post('/realtimeproducts', async (req, res, next) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
            await newManager.addProduct(title, description, price, thumbnail, code, stock);
            const products = await newManager.getProducts();
            socketServer.emit('newProduct', { products });
                 res.status(201).send({ message: "Producto agregado con éxito" });
    } catch (error) {
            next(error);
         }
});

// aca termina la configuracioon de socket lado server------------------------



app.use("/api/products", productsrouter);
app.use("/api/carts", cartsrouters);

socketServer.on('connection',socket=>{
  console.log("cliente conectado")
})