import { Router } from "express";
import admin from "../middleware/admin.js";
import passport from "passport";
import sessionctrl from "../controllers/session.routers.controller.js";

const router = Router();

const controllersession = new sessionctrl();


// router.get("/",(req,res)=>{
//     res.redirect('/login')
// })

router.post('/register',passport.authenticate('register',{failureRedirect:'/api/session/failregister'}), async (req, res) => {
    res.redirect('/login');
})

router.post('/login',admin, passport.authenticate('login', {failureRedirect: '/api/session/faillogin'}) ,controllersession.getuser)

router.get('/github',passport.authenticate('github',{scope:['user:email']}),async(req,res)=>{
    res.send({error:'register fail'})
})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/api/session/faillogin'} ),controllersession.githubcallback)

router.get('/failregister',async(req,res)=>{
    res.send({error:'register fail'})
})

router.get('/faillogin', async (req, res) => {
    res.send({error: 'falla en el register'})
})

router.post('/logout', async (req, res)=>{
    res.clearCookie('token')
    req.session.destroy(err => {
        if(err) return res.send({status:'Logout error', message: err})           
    })
    res.status(200).redirect('/login')
    console.log("borrado con exito")
})

router.get('/current', controllersession.current);



export default router;