import { Router } from "express";
// import userManagerDB from "../dao/usersManagerDB.js";
import admin from "../middleware/admin.js";
// import { createHash, isValidPassword } from "../bcrypt.js";
import passport from "passport";
import sessionctrl from "../controllers/session.routers.controller.js";


const router = Router();
// const userDB = new userManagerDB();
const controllersession = new sessionctrl();


// router.get("/",(req,res)=>{
//     res.redirect('/login')
// })


// reestructurando con controlador-----------------------------------------------------------------------------------------------------------------------
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

    req.session.destroy(err => {
        if(err) return res.send({status:'Logout error', message: err})           
    })
    res.status(200).redirect('/login')
    console.log("borrado con exito")
})

router.get('/current', controllersession.current);


//   sin reestructurar controlador-----------------------------------------
//   router.post('/register',passport.authenticate('register',{failureRedirect:'/api/session/failregister'}), async (req, res) => {
//     res.redirect('/login');
// })

// router.post('/login',admin, passport.authenticate('login', {failureRedirect: '/api/session/faillogin'}) ,async (req, res)=>{
//     if (!req.user) return res.status(401).send({status: 'error', error: 'creadential invalid'})

//     req.session.user = {
//                     name: `${req.user.first_name} ${req.user.last_name}`,
//                     email: req.user.email,
//                     id: req.user._id
//                 };
//     res.redirect('/products');
// })

// router.get('/github',passport.authenticate('github',{scope:['user:email']}),async(req,res)=>{
//     res.send({error:'register fail'})
// })

// router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/api/session/faillogin'} ),async (req, res) => {
//     req.session.user = {
//         name: `${req.user.first_name}`,
//         email: req.user.email,
//         id: req.user._id
//     };
//     res.redirect('/products')
// })

// router.get('/failregister',async(req,res)=>{
//     res.send({error:'register fail'})
// })

// router.get('/faillogin', async (req, res) => {
//     res.send({error: 'falla en el register'})
// })

// router.post('/logout', async (req, res)=>{

//     req.session.destroy(err => {
//         if(err) return res.send({status:'Logout error', message: err})           
//     })
//     res.status(200).redirect('/login')
//     console.log("borrado con exito")
// })

// router.get('/current', async (req, res) => {
//     try {
//       const currentUser =  req.session.user = {
//         name: `${req.user.first_name} ${req.user.last_name}`,
//         email: req.user.email,
//         id: req.user._id
//     };
//       if (!currentUser) {
//         return res.status(404).json({ message: 'Usuario no encontrado' });
//       }
//       res.status(200).json(currentUser);
//     } catch (error) {
//       console.error('Error al obtener el usuario actual:', error);
//       res.status(500).json({ message: 'Error del servidor' });
//     }
//   });




export default router;