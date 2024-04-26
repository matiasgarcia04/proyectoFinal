// import ProdManagerDB from "../dao/ProdManagerDB.js";
import { prodDB } from "../services/services.js";


// const prodDB = new ProdManagerDB();


class productctrl {
    createProduct= async(req,res)=>{
        try {
              // user:req.session.user

  // llamar al user=
  // user.email
            const {product} = req.body
            const { title, description, price, thumbnail, code, stock } = req.body;
            const activeUser = req.session.user; // Supongamos que esto contiene los datos del usuario

            // Determinar el valor del campo "owner"
            let owner;
            if (activeUser) {
                // Si hay un usuario en la sesión activa, asignar el "owner" al usuario
                owner = activeUser.email; // Ajusta esto según la estructura de tu usuario
            } else {
                // Si no hay usuario en la sesión activa, asignar el "owner" al administrador
                owner = 'ADMIN'; // Puedes usar un valor específico o adaptarlo según tus necesidades
            }

            await prodDB.create({ title, description, price, thumbnail, code, stock,owner });
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


