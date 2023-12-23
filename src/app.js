import express from "express";
import productsrouter from "./routers/products.routers.js";
import cartsrouters from "./routers/carts.routers.js";

const app = express();


const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products", productsrouter);
app.use("/api/carts", cartsrouters);


app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});