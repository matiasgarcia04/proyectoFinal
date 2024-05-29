import { userDB } from "../services/services.js";

class updaterol {
    update= async (req, res) => {
 
        try {
            const {uid} = req.params;
            
            const user = await userDB.getByID({ _id: uid });
    
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const cantidadArchivos = user.documents.length;
            console.log(user)
            console.log(user.documents)
            console.log(cantidadArchivos)

            if (!user.documents || cantidadArchivos < 3) {
                return res.status(400).json({ 
                  status: 'error',
                  error: `El usuario no ha terminado de procesar su documentación. Falta ${3 - cantidadArchivos} documento.` })
              }
            // Cambia el rol del usuario
            user.role = user.role === 'USER' ? 'USER_PREMIUM' : 'USER';
           const updateuser= await user.save();
    
           return  res.status(200).send({ message: "role actualizado con éxito", updateuser })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al cambiar el rol del usuario' });
        }
    }
}

export default updaterol