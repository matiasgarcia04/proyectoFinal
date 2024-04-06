// import ProdManagerDB from "../dao/ProdManagerDB.js";
import { prodDB } from "../services/services.js";


// const prodDB = new ProdManagerDB();


class productctrl {
    createProduct= async(req,res)=>{
        try {
            const { title, description, price, thumbnail, code, stock } = req.body;
            await prodDB.create({ title, description, price, thumbnail, code, stock });
                const products = await prodDB.getLean();
                     res.status(201).send({ products });
        } catch (error) {
            // console.error('Error:', error);
            req.logger.error('Error:', error);
            res.status(500).json({ message: 'Error del servidor' });
             }
    }
}

export default productctrl


