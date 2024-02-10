import { Router } from "express";
import preventprofile from "../middleware/preventprofile.js";
import preventLogin from "../middleware/preventLog.js";

const router = Router();



router.get('/login',preventLogin,(req,res)=>{
    res.render('login')
});

router.get('/register',preventLogin,(req,res)=>{
    res.render('register')
});

router.get('/perfil',preventprofile,(req,res)=>{
    res.render('perfil', { user: req.session.user })
});



export default router;