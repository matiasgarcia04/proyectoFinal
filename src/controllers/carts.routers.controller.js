// import CartProdManagerDB from "../dao/CartsProdManagerDB.js";
import { cartDB } from "../services/services.js";


// const cartDB = new CartProdManagerDB();

class carts{


    getCarts= async(req,res)=>{
        const limit = req.query.limit;
    const products =await cartDB.get();
    const response = limit ? products.slice(0, limit) : products;
        res.send(response);
            // console.log(products);

    }

    createCart= async(req,res)=>{
        try {
        
            await cartDB.create();
                 res.status(201).send({ message: "carrito creado con éxito" });
    } catch (error) {
            next(error);
         }

    }

    getCartByID= async(req,res)=>{
        try {
            const {cid}= req.params;
            const cart = await cartDB.getByID(cid)
                res.status(200).send(cart);
        } catch (error) {
                res.status(500).send('error')
            }
    }

    addToCart= async(req,res)=>{
        // const cartid= req.session.cart;
        const { cid, pid } = req.params;
  const { quantity } = req.body;
//   const { quantity } = 1;

  try {
    const cart = await cartDB.getByID(cid);
    

          if (!cart) {
              return res.status(404).send('Cart not found');
          }
    
            else {
              cart.products.push({ product: pid, quantity });
          }
    
          await cart.save();
          
    
          res.send(cart);
  } catch (error) {
    //   console.error(error);
      req.logger.error(error);
      res.status(500).send('Server error');
  }
    }
    
    deleteProduct= async(req,res)=>{
        try {
            const { cid, pid } = req.params;
            const cart = await cartDB.getByID(cid);
            if (!cart) {
                return res.status(404).send('Cart not found');
            }
      
              else {
               cart.products.pull({_id:pid});
               cart.save();
               res.status(200).send({ message: 'producto borrado del carrito' });
            }
    
        } catch (error) {
            res.status(500).send('error')
        }
    }

    updateQuantity= async(req,res)=>{
        try {
            const { cid, pid } = req.params;
            const cart = await cartDB.getByID(cid);
            if (!cart) {
                return res.status(404).send('Cart not found');
            }
      
              else {
               let product=cart.products.id({_id:pid});
               product.quantity=req.body.quantity;
               cart.save();
               res.status(200).send({ message: 'producto del carrito actualizado' });
            }
        } catch (error) {
            res.status(500).send('error')
        }
    }
    deleteCart=async(req,res)=>{
        try {
            const {cid}= req.params;
            await cartDB.delete(cid)
                res.status(200).send({ message: 'Carrito borrado con éxito' });
        } catch (error) {
                res.status(500).send('error')
            }
    }

}

export default carts