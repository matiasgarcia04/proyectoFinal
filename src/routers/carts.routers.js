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




// sin controladores-------------------------------
// router.get("/", async (req, res) => {
//     const limit = req.query.limit;
//     const products =await newCartManager.getCarts();
//     const response = limit ? products.slice(0, limit) : products;
//         res.send(response);
//             console.log(products);
// });


// router.post("/", async (req, res, next) => {
//     try {
        
//             await newCartManager.createCart();
//                  res.status(201).send({ message: "carrito creado con éxito" });
//     } catch (error) {
//             next(error);
//          }
// });


// router.get("/:cid", async(req, res) =>{
//     try {
//         const {cid}= req.params;
//         const cart = await newCartManager.getCartbyID(cid)
//             res.status(200).send(cart);
//     } catch (error) {
//             res.status(500).send('error')
//         }
// })




// router.post('/:cid/products/:pid', async (req, res) => {
//   const { cid, pid } = req.params;
//   const { quantity } = req.body;

//   try {
//     const cart = await newCartManager.getCartbyID(cid);

//           if (!cart) {
//               return res.status(404).send('Cart not found');
//           }
    
//             else {
//               cart.products.push({ product: pid, quantity });
//           }
    
//           await cart.save();
          
    
//           res.send(cart);
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Server error');
//   }
// });

// // check// DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
// router.delete("/:cid/products/:pid",async(req, res)=>{
//     try {
//         const { cid, pid } = req.params;
//         const cart = await newCartManager.getCartbyID(cid);
//         if (!cart) {
//             return res.status(404).send('Cart not found');
//         }
  
//           else {
//            cart.products.pull({_id:pid});
//            cart.save();
//            res.status(200).send({ message: 'producto borrado del carrito' });
//         }

//     } catch (error) {
//         res.status(500).send('error')
//     }
    

// })

// // PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
// router.put("/:cid/products/:pid",async(req, res)=>{
//     try {
//         const { cid, pid } = req.params;
//         const cart = await newCartManager.getCartbyID(cid);
//         if (!cart) {
//             return res.status(404).send('Cart not found');
//         }
  
//           else {
//            let product=cart.products.id({_id:pid});
//            product.quantity=req.body.quantity;
//            cart.save();
//            res.status(200).send({ message: 'producto del carrito actualizado' });
//         }
//     } catch (error) {
//         res.status(500).send('error')
//     }

// })


// // DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
// router.delete("/:cid", async(req, res) =>{
//     try {
//         const {cid}= req.params;
//         await newCartManager.deleteCart(cid)
//             res.status(200).send({ message: 'Carrito borrado con éxito' });
//     } catch (error) {
//             res.status(500).send('error')
//         }
// })






export default router;