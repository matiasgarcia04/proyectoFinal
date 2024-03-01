import { Router } from "express";
// import CartManagerDB from "../dao/CartsProdManagerDB.js";
import cartctrl from "../controllers/cartViews.routers.controller.js";

const router = Router();
// const newCartManager= new CartManagerDB();
const controllercart = new cartctrl();

router.get("/:cid", controllercart.getCart)

// sin controlador--------------------------
//   router.get("/:cid", async(req, res) =>{
//     try {
//         const {cid}= req.params;
//         const cart = await newCartManager.getCartbyIDLean({_id:cid})
//         const products= cart.products;
//         res.render('cart', { products }); 
//     } catch (error) {
//             res.status(500).send('error')
//            console.log(error)
//         }
//   })


export default router