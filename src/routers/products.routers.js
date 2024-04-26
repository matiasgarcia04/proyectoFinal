import { Router } from "express";
import apiproducts from "../controllers/products.routers.controller.js";

const router = Router();

const controllerapiprod = new apiproducts();


// ejemplo:http://localhost:8080/api/products?limit=3&page=5&?sort=asc
router.get("/", controllerapiprod.getProducts);
  

router.get('/:pid', controllerapiprod.getProduct);

router.post("/", controllerapiprod.createProduct);


router.put('/:pid', controllerapiprod.updateProduct);

router.delete('/:pid', controllerapiprod.deleteProduct);

export default router;