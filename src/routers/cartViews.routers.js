import { Router } from "express";
import cartctrl from "../controllers/cartViews.routers.controller.js";

const router = Router();
const controllercart = new cartctrl();

router.get("/:cid", controllercart.getCart)

router.post("/:cid/purchase",controllercart.purchase)


// check compra, si no hay productos suficientes, no permite la compra
    // router.post("/:cid/purchase", async (req, res) => {
    //     try {
    //         const { cid } = req.params;
    //         const cart = await cartDB.getByID(cid);
    //         if (!cart) {
    //             return res.status(401).json({
    //                 status: 'error',
    //                 message: 'Cart not found'
    //             });
    //         }

    //         const unprocessedProductIds = []; // Array to store IDs of unprocessed products

    //         for (const item of cart.products) {
    //             const product = item.product;
    //             if (product.stock < item.quantity) {
    //                 unprocessedProductIds.push(product._id); // Add the product ID to the array
    //             } else {
    //                 product.stock -= item.quantity;
    //                 await product.save();
    //             }
    //         }

    //         if (unprocessedProductIds.length > 0) {
    //             return res.status(400).json({
    //                 message: 'No hay suficiente stock para algunos productos',
    //                 unprocessedProductIds
    //             });
    //         }

    //         // Calculate total price
    //         let totalPrice = 0;
    //         for (const item of cart.products) {
    //             const product = item.product;
    //             totalPrice += product.price * item.quantity;
    //         }

    //         // Generate ticket
    //         const ticket = await ticketDB.create({
    //             code: Math.random().toString(30).substring(2),
    //             amount: totalPrice,
    //             purchaser: "email@email.com",
    //         });

    //         // return res.status(200).json({ message: 'Compra exitosa' });
    //             res.status(200).json({
    //                 status: 'success',
    //                 message: 'Purchase completed successfully',
    //                 unprocessedProductIds,
    //                 ticket,
                    
    //                 });
    //     } catch (error) {
    //         console.error('Error al finalizar la compra:', error);
    //         return res.status(500).json({ message: 'Error interno del servidor' });
    //     }
    // });

export default router