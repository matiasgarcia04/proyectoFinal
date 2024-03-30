import { Router } from "express";
// import ProdManagerDB from "../dao/ProdManagerDB.js";
import productctrl from "../controllers/realTimeProducts.routers.controller.js";

const router = Router();
// const newProdDB = new ProdManagerDB();
const controllerproduct =new productctrl();



router.post('/', controllerproduct.createProduct);


export default router