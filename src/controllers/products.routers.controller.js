import ProdManagerDB from "../dao/ProdManagerDB.js"


const prodDB = new ProdManagerDB();


class apiproducts{
    getProducts= async (req,res)=>{
        const sort = req.query.sort === 'asc' ? 1 : req.query.sort === 'desc' ? -1 : '';
    const limit = parseInt(req.query.limit) || 10;
    const pag = parseInt(req.query.pag) || 1;
    
    const products =await prodDB.paginate(sort,limit, pag);
        res.send(products);
    }

    getProduct= async (req,res)=>{
        try {
            const {pid} = req.params;
          const theproduct = await prodDB.getByID(pid);
            if (theproduct) {
              res.send(theproduct);
                console.log(theproduct);
            } else {
                    res.status(404).send('Producto no encontrado');
                }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
    createProduct=async(req,res)=>{
        try {
            const { title, description, price, thumbnail, code, stock } = req.body;
                await prodDB.create({title:title, description: description,price: price, thumbnail:thumbnail, code: code, stock:stock});
                     res.status(201).send({ message: "Producto agregado con éxito" });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error del servidor' });
             }
    }
    updateProduct=async (req,res)=>{
        try {
            const { pid } = req.params;
            const {title:title, description: description,price: price, thumbnail:thumbnail, code: code, stock:stock} = req.body;
               const updateprod= await prodDB.update(pid, {title:title, description: description,price: price, thumbnail:thumbnail, code: code, stock:stock},{new: true});
                    res.status(200).send({ message: "Producto actualizado con éxito", updateprod });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error del servidor' });
            }
    }


    deleteProduct=async (req,res)=>{
        try {
            const { pid } = req.params;
                await prodDB.delete(pid);
                    res.status(200).json({ message: 'Producto borrado con éxito' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error del servidor' });
            }

    }


}

export default apiproducts