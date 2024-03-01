import { Router } from "express";
// import ProdManagerDB from "../dao/ProdManagerDB.js";
import productctrl from "../controllers/realTimeProducts.routers.controller.js";

const router = Router();
// const newProdDB = new ProdManagerDB();
const controllerproduct =new productctrl();



router.post('/', controllerproduct.createProduct);



//   sin reestructurar controlador-----------------------------------------
// router.post('/', async (req, res, next) => {
//     try {
//         const { title, description, price, thumbnail, code, stock } = req.body;
//         await newProdDB.createProduct({ title, description, price, thumbnail, code, stock });
//             const products = await newProdDB.getProductsLean();
//                  res.status(201).send({ products });
//     } catch (error) {
//             next(error);
//          }
// });

export default router