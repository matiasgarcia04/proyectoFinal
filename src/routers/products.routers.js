import { Router } from "express";
import ProdManagerDB from "../dao/ProdManagerDB.js"

const router = Router();
const newProdDB = new ProdManagerDB();


// ejemplo:http://localhost:8080/api/products?limit=3&page=5&?sort=asc
router.get("/", async (req, res) => {
    const sort = req.query.sort === 'asc' ? 1 : req.query.sort === 'desc' ? -1 : '';
    const limit = parseInt(req.query.limit) || 10;
    const pag = parseInt(req.query.pag) || 1;
    
    const products =await newProdDB.getProdPag(sort,limit, pag);
        res.send(products);
});
  

router.get('/:pid', async (req, res) => {
    try {
        const {pid} = req.params;
      const theproduct = await newProdDB.getProduct(pid);
        if (theproduct) {
          res.send(theproduct);
            console.log(theproduct);
        } else {
                res.status(404).send('Producto no encontrado');
            }
    } catch (error) {
        next(error);
    }
      
});

router.post("/", async (req, res, next) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
            await newProdDB.createProduct({title:title, description: description,price: price, thumbnail:thumbnail, code: code, stock:stock});
                 res.status(201).send({ message: "Producto agregado con éxito" });
    } catch (error) {
            next(error);
         }
});


router.put('/:pid', async (req, res, next) => {
    try {
        const { pid } = req.params;
        const {title:title, description: description,price: price, thumbnail:thumbnail, code: code, stock:stock} = req.body;
           const updateprod= await newProdDB.updateProduct(pid, {title:title, description: description,price: price, thumbnail:thumbnail, code: code, stock:stock},{new: true});
                res.status(200).send({ message: "Producto actualizado con éxito", updateprod });
    } catch (error) {
            next(error);
        }
});

router.delete('/:pid', async (req, res,next) => {
    try {
        const { pid } = req.params;
            await newProdDB.deleteProduct(pid);
                res.status(200).json({ message: 'Producto borrado con éxito' });
    } catch (error) {
            next(error);
        }
});


export default router;