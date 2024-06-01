
import { prodDB } from "../services/services.js";



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
              
            } else {
                    res.status(404).send('Producto no encontrado');
                }
        } catch (error) {
           
            req.logger.error('Error:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
    createProduct=async(req,res)=>{
        try {
            const { title, description, price, thumbnail, code, stock } = req.body;

            const activeUser = req.session.user;
            
        // Determinar el valor del campo "owner"
        let owner;
        if (activeUser) {
            // Si hay un usuario en la sesión activa, asignar el "owner" al usuario
            owner = activeUser.email; 
        } else {
            // Si no hay usuario en la sesión activa, asignar el "owner" al administrador
            owner = 'ADMIN';
        }

            
                await prodDB.create({title:title, description: description,price: price, thumbnail:thumbnail, code: code, stock:stock, owner:owner});
                     res.status(201).send({ message: "Producto agregado con éxito" });
        } catch (error) {
           
            req.logger.error('Error:', error);
            res.status(500).json({ message: 'Error del servidor' });
             }
    }
    updateProduct=async (req,res)=>{
        try {
            const { pid } = req.params;
            const {title:title, description: description,price: price, thumbnail:thumbnail, code: code, stock:stock} = req.body;

            const activeUser = req.session.user; 

            // "owner"
            let owner;
            if (activeUser) {
                
                owner = activeUser.email; 
            } else {
               
                owner = 'ADMIN';
            }

               const updateprod= await prodDB.update(pid, {title:title, description: description,price: price, thumbnail:thumbnail, code: code, stock:stock, owner:owner},{new: true});
                    res.status(200).send({ message: "Producto actualizado con éxito", updateprod });
        } catch (error) {
          
            req.logger.error('Error:', error);
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