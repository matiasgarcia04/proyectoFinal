import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const newManager = new ProductManager();


router.get("/", (req, res) => {
    const limit = req.query.limit;
    const products = newManager.getProducts();
    const response = limit ? products.slice(0, limit) : products;
        res.send(response);
            console.log(newManager.getProducts());
    res.render('home', { products });
});
  

router.get('/:pid', async (req, res) => {
      const {pid} = req.params;
      const theproduct = await newManager.getProductById(pid);
        if (theproduct) {
          res.send(theproduct);
            console.log(theproduct);
        } else {
                res.status(404).send('Producto no encontrado');
            }
});

router.post("/", async (req, res, next) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
            await newManager.addProduct(title, description, price, thumbnail, code, stock);
                 res.status(201).send({ message: "Producto agregado con éxito" });
    } catch (error) {
            next(error);
         }
});

router.put('/:pid', async (req, res, next) => {
    try {
        const { pid } = req.params;
        const { title, description, price, thumbnail, code, stock } = req.body;
            await newManager.updateProduct(pid, { title, description, price, thumbnail, code, stock });
                res.status(200).send({ message: "Producto actualizado con éxito" });
    } catch (error) {
            next(error);
        }
});


router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
            await newManager.deleteProduct(pid);
                res.status(200).json({ message: 'Producto borrado con éxito' });
    } catch (error) {
            next(error);
        }
});


export default router;