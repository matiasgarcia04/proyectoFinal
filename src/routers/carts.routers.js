import { Router } from "express";
// import cartManager from "../cartManager.js";
import CartProdManagerDB from "../dao/CartsProdManagerDB.js";

const router = Router();
// const newManager = new cartManager();
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
        const { product, quantity } = req.body;
            await newCartManager.createCart({ product: product, quantity: quantity });
                 res.status(201).send({ message: "Producto agregado con éxito" });
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

      const productIndex = cart.products.findIndex(product => product.toString() === pid);

      if (productIndex === -1) {
          cart.products.push({ product: pid, quantity });
      } else {
          cart.products[productIndex].quantity += quantity;
      }

      await cart.save();

      res.send(cart);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
});

export default router;


// ------------------------filesystem-------------------------------


// import { Router } from "express";
// import cartManager from "../cartManager.js";

// const router = Router();
// const newManager = new cartManager();
//                                     // // crear carrito
// router.post("/", async (req, res) =>{
//     try {
//         const result = await newManager.createcart()
//             res.send(
//             {status:'success',
//                  payload: result
//             }
//             )
//     } catch (error) {
//             res.status(500).send('error')
//         }
// })

//                                 // // trae un carrito por cid
// router.get("/:cid", async(req, res) =>{
//     try {
//         const {cid}= req.params;
//         const cart = await newManager.getCartById(cid);
//             res.status(200).send(cart);
//     } catch (error) {
//             res.status(500).send('error')
//         }
// })


//                                 // // agrega el producto
// router.post("/:cid/product/:pid",async(req, res) =>{
//     try {
//        const {cid, pid}=req.params
//        const result = await newManager.addProduct(cid, pid);
//             res.send(result);
//                 console.log(result);
//     } catch (error) {
//             res.status(500).send('error')
//         }
// })



// export default router;