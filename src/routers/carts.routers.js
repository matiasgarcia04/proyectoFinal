import { Router } from "express";
import cartManager from "../cartManager.js";

const router = Router();
const newManager = new cartManager();
                                    // // crear carrito
router.post("/", async (req, res) =>{
    try {
        const result = await newManager.createcart()
            res.send(
            {status:'success',
                 payload: result
            }
            )
    } catch (error) {
            res.status(500).send('error')
        }
})

                                // // trae un carrito por cid
router.get("/:cid", async(req, res) =>{
    try {
        const {cid}= req.params;
        const cart = await newManager.getCartById(cid);
            res.status(200).send(cart);
    } catch (error) {
            res.status(500).send('error')
        }
})


                                // // agrega el producto
router.post("/:cid/product/:pid",async(req, res) =>{
    try {
       const {cid, pid}=req.params
       const result = await newManager.addProduct(cid, pid);
            res.send(result);
                console.log(result);
    } catch (error) {
            res.status(500).send('error')
        }
})



export default router;