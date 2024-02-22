import { Router } from "express";
import chatManagerDB from "../dao/chatManagerDB.js";
import preventprofile from "../middleware/preventprofile.js";

const chatDB = new chatManagerDB();


const router = Router();

  router.get('/', (req, res) => {
    chatDB.getChatLean().then((messages) => {
      res.render('chat', { messages });
    }).catch((error) => {
      console.error('Error al buscar los mensajes:', error);
      res.status(500).send('Error interno del servidor');
    });
  });
  router.post('/',preventprofile,async (req, res) => {
    const { name } = req.session.user;
    const message = chatDB.createChat({user:name, message:req.body.message});
    message.then(() => {
      res.redirect('/chat');
    }).catch((error) => {
      console.error('Error al guardar el mensaje:', error);
      res.status(500).send('Error interno del servidor');
    });
  });

  export default router;