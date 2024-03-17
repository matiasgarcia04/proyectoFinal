import CartManagerDB from "../dao/CartsProdManagerDB.js";


const cartDB= new CartManagerDB();

class cartctrl {
    getCart = async (req,res)=>{
        try {
            const {cid}= req.params;
            const cart = await cartDB.getByIDLean({_id:cid})
            const products= cart.products;
            res.render('cart', { products }); 
        } catch (error) {
                res.status(500).send('error')
               console.log(error)
            }
    }
}


export default cartctrl