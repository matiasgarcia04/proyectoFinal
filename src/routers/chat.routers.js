import { Router } from "express";
import preventprofile from "../middleware/preventprofile.js";
import chatctrl from "../controllers/chat.routers.controller.js";


const controllerchat = new chatctrl();


const router = Router();

  router.get('/', controllerchat.getChat);


  router.post('/',preventprofile, controllerchat.createChat);

  export default router;