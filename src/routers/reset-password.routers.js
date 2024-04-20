import { Router } from "express";
import resetpassctrl from "../controllers/reset-password.controller.js";
const router = Router();

const resetpass = new resetpassctrl()

// const private_key="coderhouse";



router.get('/',(req,res)=>{

    res.send('email enviado')
  })

router.post('/',resetpass.createrequest);

router.post('/newpass',resetpass.newpass)



export default router;