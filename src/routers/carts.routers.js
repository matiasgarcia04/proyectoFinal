import { Router } from "express";
// import CartProdManagerDB from "../dao/CartsProdManagerDB.js";
import carts from "../controllers/carts.routers.controller.js";



const router = Router();
// const newCartManager = new CartProdManagerDB();
const controllercarts = new carts();


router.get("/", controllercarts.getCarts);


router.post("/", controllercarts.createCart);


router.get("/:cid", controllercarts.getCartByID);




router.post('/:cid/products/:pid', controllercarts.addToCart);

// check// DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
router.delete("/:cid/products/:pid",controllercarts.deleteProduct);

// PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put("/:cid/products/:pid",controllercarts.updateQuantity);


// DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
router.delete("/:cid", controllercarts.deleteCart)



export default router;