import {sendMail} from "../utils/nodemailer.js";
import { userDB } from "../services/services.js";
import { generatetoken } from "../utils/token.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import configObjet from "../config/dotenv.js";

class resetpassctrl {
    createrequest= async (req, res) => {
        try {
            const { email } = req.body;
            const user = await userDB.getByEmail({email:email});
      
            if (!user) return res.status(400).send({status: 'error', message: 'El usuario no existe'})
      
            const token= generatetoken({user:email,expiresIn: '1h'});
            
            const to= email
            const subject='Reinicio de contraseña'
            const html=`<p>Haz clic <a href="http://${req.headers.host}/resetpassconfirm/${token}">aquí</a> para restablecer tu contraseña.</p>`
      
            sendMail(to,subject,html)
      
            res.redirect('/mensajenviado');
        } catch (error) {
       
          req.logger.error('Error:', error);
          res.status(500).send('Error al procesar la solicitud');
        }
    };
    newpass=async (req, res) => {
        try {
          
            const { newPassword, token } = req.body;
    
            const decodedUser = jwt.verify(token, configObjet.private_key)
    
            const email= decodedUser.user.user
            const user = await userDB.getByEmail( {email:email})
          
            if (!decodedUser) return res.status(400).send({status: 'error', message: 'El token no es válido o ha expirado'})

            if (!user) {
                return res.status(404).send({ error: 'Usuario no encontrado' });
            }
    
            // Verifica si la nueva contraseña es diferente de la anterior
            if (newPassword=== user.password) {
                return res.status(400).send({ error: 'No puedes usar la misma contraseña anterior' });
            }
    
            // Hashea la nueva contraseña
            const hashedPassword = await bcrypt.hash(newPassword, 10);
    
            // Actualiza la contraseña en la base de datos
            user.password = hashedPassword;
            user.resetToken = null; // Limpia el token de restablecimiento
            await user.save();
    
            res.send('¡Contraseña actualizada con éxito! <a href="/login">Iniciar sesión</a>');
        } catch (error) {
            req.logger.error('Error:', error);
            res.status(500).send('Error al procesar la solicitud');
        }
    }
    
}

export default resetpassctrl