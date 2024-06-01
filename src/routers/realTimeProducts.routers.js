import { Router } from "express";
import productctrl from "../controllers/realTimeProducts.routers.controller.js";

const router = Router();
const controllerproduct =new productctrl();

router.post('/', controllerproduct.createProduct);


export default router