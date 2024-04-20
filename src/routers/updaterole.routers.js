import { Router } from "express";
import { userDB } from "../services/services.js";

const router = Router();

// Ruta para cambiar el rol del usuario
router.put('/premium/:uid', async (req, res) => {
    try {
        const uid = req.params.uid;
        const user = await userDB.getByID({ _id: uid });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Cambia el rol del usuario
        user.role = user.role === 'USER' ? 'USER_PREMIUM' : 'USER';
        await user.save();

        // Actualiza la sesión si estás usando express-session
        req.session.user.role = user.role;

        return res.status(200).json({ message: 'Rol de usuario actualizado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al cambiar el rol del usuario' });
    }
});

export default router;