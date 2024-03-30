import { Router } from "express";
// import chatManagerDB from "../dao/chatManagerDB.js";
import preventprofile from "../middleware/preventprofile.js";
import chatctrl from "../controllers/chat.routers.controller.js";

// const chatDB = new chatManagerDB();
const controllerchat = new chatctrl();


const router = Router();

  router.get('/', controllerchat.getChat);


  router.post('/',preventprofile, controllerchat.createChat);

  export default router;