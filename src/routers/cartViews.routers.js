import { Router } from "express";
import CartManagerDB from "../dao/CartsProdManagerDB.js";

const router = Router();
const newCartManager= new CartManagerDB();

router.get("/:cid", async(req, res) =>{
    try {
        const {cid}= req.params;
        const cart = await newCartManager.getCartbyIDLean({_id:cid})
        const products= cart.products;
        res.render('cart', { products }); 
    } catch (error) {
            res.status(500).send('error')
           console.log(error)
        }
  })


export default router