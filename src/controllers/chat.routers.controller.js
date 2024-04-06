// import chatManagerDB from "../dao/chatManagerDB.js";
import { chatDB } from "../services/services.js";


// const chatDB = new chatManagerDB();

class chatctrl{
    getChat= async(req,res)=>{
        chatDB.getLean().then((messages) => {
            res.render('chat', { messages });
          }).catch((error) => {
            // console.error('Error al buscar los mensajes:', error);
            req.logger.error('Error al buscar los mensajes:', error);
            res.status(500).send('Error interno del servidor');
          });
    }
    createChat= async(req,res)=>{
        const { name } = req.session.user;
    const message = chatDB.create({user:name, message:req.body.message});
    message.then(() => {
      res.redirect('/chat');
    }).catch((error) => {
      // console.error('Error al guardar el mensaje:', error);
      req.logger.error('Error al guardar el mensaje:', error);
      res.status(500).send('Error interno del servidor');
    });
    }

}

export default chatctrl