// import CartManagerDB from "../dao/CartsProdManagerDB.js";
// import purchaseManagerDB from "../dao/purchaseManagerDB.js";
// import ProdManagerDB from "../dao/ProdManagerDB.js";
import { prodDB,cartDB,ticketDB } from "../services/services.js";



// const cartDB= new CartManagerDB();
// const probDB = new ProdManagerDB();
// const ticketDB = new purchaseManagerDB();

class cartctrl {
    getCart = async (req,res)=>{
        try {
            const {cid}= req.params;
            const cart = await cartDB.getByIDLean({_id:cid})
            const products= cart.products;
            res.render('cart', { products }); 
        } catch (error) {
                res.status(500).send('error')
            //    console.log(error)
             req.logger.error(error);
            }
    }
    purchase = async (req,res)=>{
        try {
                const {pid,cid}= req.params;
                const cart = await cartDB.getByID(cid)
                if (!cart) {
                    return res.status(401).json({
                        status: 'error',
                        message: 'Cart not found'
                    });
                    }
    
                const productsNotPurchased = [];
                let totalPrice=0
    
                // comprobar stock, si no hay suficiente stock, lo manda al Array, si hay continua y resta cantidad del stock
                for (const item of cart.products) {
                            const product = item.product;
                            
                            if (product.stock < item.quantity) {
                                productsNotPurchased.push(product._id);
                            }else {
                                // Si hay suficiente stock, restamos la cantidad comprada del stock del producto
                                
                                    
                                    product.stock -= item.quantity;
                                    await product.save();
                                    
                                    totalPrice += product.price * item.quantity;
                            };
                        }
                        
        // generar ticker
                const ticket = await ticketDB.create({
                        code: Math.random().toString(30).substring(2),
                        amount: totalPrice,
                        // purchaser: req.user.email,
                        purchaser: "email@email.com",
                        });
    
        
        for (const item of cart.products) {
        const product = item.product;
        cartDB.delete(cid);
        if (!productsNotPurchased.includes(product._id)) {
            product.stock -= item.quantity;
            await product.save();
        } 
        }
        for (const productId of productsNotPurchased) {
        // Encuentra el producto correspondiente en la base de datos
        const productToAdd = await prodDB.getByID(productId);
        if (productToAdd) {
            // Agrega el producto al carrito con una cantidad predeterminada (por ejemplo, 1)
            cart.products.push({
                product: productToAdd,
                quantity: 1,
            });
        }
        }
        await cart.save();
    
                // return res.status(200).json({ message: 'Compra exitosa' });
                res.status(200).json({
                    status: 'success',
                    message: 'Purchase completed successfully',
                    productsNotPurchased,
                    ticket,
                    
                    });
            } catch (error) {
                // console.error('Error al finalizar la compra:', error);
                req.logger.error('Error al finalizar la compra:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
            }
    }


}


export default cartctrl