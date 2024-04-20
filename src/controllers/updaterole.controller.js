import { userDB } from "../services/services.js";

class updaterol {
    update= async (req, res) => {
 
        try {
            const {uid} = req.params;
            
            const user = await userDB.getByID({ _id: uid });
    
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
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