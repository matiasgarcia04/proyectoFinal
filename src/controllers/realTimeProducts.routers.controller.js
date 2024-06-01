
import { prodDB } from "../services/services.js";

class productctrl {
    createProduct= async(req,res)=>{
        try {
            
            const {product} = req.body
            const { title, description, price, thumbnail, code, stock } = req.body;
            const activeUser = req.session.user;

            // "owner"
            let owner;
            if (activeUser) {
                
                owner = activeUser.email; 
            } else {
                
                owner = 'ADMIN';
            }

            await prodDB.create({ title, description, price, thumbnail, code, stock,owner });
                const products = await prodDB.getLean();
                     res.status(201).send({ products });
        } catch (error) {
            req.logger.error('Error:', error);
            res.status(500).json({ message: 'Error del servidor' });
             }
    }
}

export default productctrl


