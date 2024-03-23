import { Router } from "express";
import CartManagerDB from "../dao/CartsProdManagerDB.js";
import cartctrl from "../controllers/cartViews.routers.controller.js";
import purchaseManagerDB from "../dao/purchaseManagerDB.js";
import ProdManagerDB from "../dao/ProdManagerDB.js";

const router = Router();
const cartDB= new CartManagerDB();
const controllercart = new cartctrl();
const ticketDB = new purchaseManagerDB();
const probDB = new ProdManagerDB();


router.get("/:cid", controllercart.getCart)

// router.post("/:cid/purchase",async (req,res)=>{
//         try {
//             const {cid}= req.params;
//             const cart = await cartDB.getByID(cid)
//             if (!cart) {
//                 return res.status(401).json({
//                     status: 'error',
//                     message: 'Cart not found'
//                 });
//                 }

//             const productsNotPurchased = [];
//             let totalPrice=0

//             // comprobar stock
//             // for (const item of cart.products) {
//             //         const product = item.product;
//             //         if (product.stock < item.quantity) {
//             //             return res.status(400).json({ message: `No hay suficiente stock para ${product.title}` });
//             //         }
//             //     }
//             // restar stock
//                         // for (const item of cart.products) {
//                         //         const product = item.product;
//                         //         product.stock -= item.quantity;
//                         //         await product.save();
//                         //     }
//                         // calcular precio total
//                             // let totalPrice = 0;
//                             // for (const item of cart.products) {
//                             //     const product = item.product;
//                             //     totalPrice += product.price * item.quantity;
//                             // }



//             // comprobar stock, si no hay suficiente stock, lo manda al Array, si hay continua y resta cantidad del stock
//             for (const item of cart.products) {
//                         const product = item.product;
//                         if (product.stock < item.quantity) {
//                             productsNotPurchased.push(product._id);
//                         }else {
//                             // Si hay suficiente stock, restamos la cantidad comprada del stock del producto
                            
                                
//                                 product.stock -= item.quantity;
//                                 await product.save();
                                
//                                 totalPrice += product.price * item.quantity;
//                         };
//                     }
//             // generar ticker
//             const ticket = await ticketDB.create({
//                     code: Math.random().toString(30).substring(2),
//                     amount: totalPrice,
//                     // purchaser: req.user.email,
//                     purchaser: "email@email.com",
//                     });
//             // console.log(ticket);

//             const purchasedProductIds = productsNotPurchased.map((product) => product._id);
//             cart.products = cart.products.filter((item) => !purchasedProductIds.includes(item.product));
            
//             // Guarda el carrito actualizado
//             await cart.save();
            

//             // return res.status(200).json({ message: 'Compra exitosa' });
//             res.status(200).json({
//                 status: 'success',
//                 message: 'Purchase completed successfully',
//                 productsNotPurchased,
//                 ticket,
                
//                 });
//         } catch (error) {
//             console.error('Error al finalizar la compra:', error);
//         return res.status(500).json({ message: 'Error interno del servidor' });
//         }
// })

router.post("/:cid/purchase", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartDB.getByID(cid);
        if (!cart) {
            return res.status(401).json({
                status: 'error',
                message: 'Cart not found'
            });
        }

        const unprocessedProductIds = []; // Array to store IDs of unprocessed products

        for (const item of cart.products) {
            const product = item.product;
            if (product.stock < item.quantity) {
                unprocessedProductIds.push(product._id); // Add the product ID to the array
            } else {
                product.stock -= item.quantity;
                await product.save();
            }
        }

        if (unprocessedProductIds.length > 0) {
            return res.status(400).json({
                message: 'No hay suficiente stock para algunos productos',
                unprocessedProductIds
            });
        }

        // Calculate total price
        let totalPrice = 0;
        for (const item of cart.products) {
            const product = item.product;
            totalPrice += product.price * item.quantity;
        }

        // Generate ticket
        const ticket = await ticketDB.create({
            code: Math.random().toString(30).substring(2),
            amount: totalPrice,
            purchaser: "email@email.com",
        });

        // return res.status(200).json({ message: 'Compra exitosa' });
            res.status(200).json({
                status: 'success',
                message: 'Purchase completed successfully',
                productsNotPurchased,
                ticket,
                
                });
    } catch (error) {
        console.error('Error al finalizar la compra:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

export default router