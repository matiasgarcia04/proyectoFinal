import { Router } from "express";
import CartProdManagerDB from "../dao/CartsProdManagerDB.js";

const router = Router();
const newCartManager = new CartProdManagerDB();

router.get("/", async (req, res) => {
    const limit = req.query.limit;
    const products =await newCartManager.getCarts();
    const response = limit ? products.slice(0, limit) : products;
        res.send(response);
            console.log(products);
});


router.post("/", async (req, res, next) => {
    try {
        
            await newCartManager.createCart();
                 res.status(201).send({ message: "carrito creado con éxito" });
    } catch (error) {
            next(error);
         }
});


router.get("/:cid", async(req, res) =>{
    try {
        const {cid}= req.params;
        const cart = await newCartManager.getCartbyID(cid)
            res.status(200).send(cart);
    } catch (error) {
            res.status(500).send('error')
        }
})



router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await newCartManager.getCartbyID(cid);

          if (!cart) {
              return res.status(404).send('Cart not found');
          }
    
            else {
              cart.products.push({ product: pid, quantity });
          }
    
          await cart.save();
          
    
          res.send(cart);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
});

export default router;