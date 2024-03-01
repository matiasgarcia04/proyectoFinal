import ProdManagerDB from "../dao/ProdManagerDB.js";


const newProdDB = new ProdManagerDB();


class productctrl {
    createProduct= async(req,res)=>{
        try {
            const { title, description, price, thumbnail, code, stock } = req.body;
            await newProdDB.createProduct({ title, description, price, thumbnail, code, stock });
                const products = await newProdDB.getProductsLean();
                     res.status(201).send({ products });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error del servidor' });
             }
    }
}

export default productctrl


