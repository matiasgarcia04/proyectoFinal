import chatManagerDB from "../dao/chatManagerDB.js";


const chatDB = new chatManagerDB();

class chatctrl{
    getChat= async(req,res)=>{
        chatDB.getChatLean().then((messages) => {
            res.render('chat', { messages });
          }).catch((error) => {
            console.error('Error al buscar los mensajes:', error);
            res.status(500).send('Error interno del servidor');
          });
    }
    createChat= async(req,res)=>{
        const { name } = req.session.user;
    const message = chatDB.createChat({user:name, message:req.body.message});
    message.then(() => {
      res.redirect('/chat');
    }).catch((error) => {
      console.error('Error al guardar el mensaje:', error);
      res.status(500).send('Error interno del servidor');
    });
    }

}

export default chatctrl