import { Router } from "express";
import userManagerDB from "../dao/usersManagerDB.js";
import admin from "../middleware/admin.js";
// import { createHash, isValidPassword } from "../bcrypt.js";
import passport from "passport";



const router = Router();
const userDB = new userManagerDB();


router.get("/",(req,res)=>{
    res.redirect('/login')
})

// sin passport---------------------------------------------------------------------------------------------
// router.post("/login",admin, async (req, res) => {
//     const { email, password } = req.body;
//     // console.log(req.body)

//     try {
//         const user = await userDB.getUserByEmail({ email:email});
//         // console.log(user)

//         if (!user) {
//             // console.log();
//             return res.status(401).send({ status: 'error', message: 'Usuario  incorrectos' });
            
//         }
//         // sin bcrypt
//         // if ( req.body.password !== user.password) {
//         //     // console.log(req.body.password)
//         //     // console.log(user.password)
//         //     return res.status(401).send({ status: 'error', message: ' contraseña incorrectos' });
//         // }
//         // con bcrypt
//         if (!isValidPassword(req.body.password, user.password)) {
//             // console.log(isValidPassword)
//             return res.status(401).send({ status: 'error', message: ' contraseña incorrectos' });
//         }
//         req.session.user = {
//             name: `${user.first_name} ${user.last_name}`,
//             email: user.email
//         };
//         res.redirect('/products');
//     } catch (error) {
//         console.error('Error al autenticar al usuario:', error);
//         res.status(500).send({ status: 'error', message: 'Error interno del servidor' });
//     }
// });


// router.post('/register', async (req, res) => {
//     const { first_name, last_name, email, age, password } = req.body;

//     try {
//         const exists = await userDB.getUserByEmail({ email: req.body.email });
//         if (exists) {
//             return res.status(401).send({ status: 'error', message: 'El usuario ya existe' });
//         }

//         const user = await userDB.createUser({
//             first_name:first_name,
//             last_name:last_name,
//             email:email,
//             age:age,
//             password:createHash(password),
//         });

       
//         res.redirect('/login');
      
//     } catch (error) {
//         console.error('Error al crear el usuario:', error);
//         res.status(500).send({ status: 'error', message: 'Error al crear el usuario' });
//     }
// });

// con passport-----------------------------------------------------------------------------------------------------------------------
router.post('/register',passport.authenticate('register',{failureRedirect:'/api/session/failregister'}), async (req, res) => {
    res.redirect('/login');
})

router.post('/login',admin, passport.authenticate('login', {failureRedirect: '/api/session/faillogin'}) ,async (req, res)=>{
    if (!req.user) return res.status(401).send({status: 'error', error: 'creadential invalid'})

    req.session.user = {
                    name: `${req.user.first_name} ${req.user.last_name}`,
                    email: req.user.email,
                    id: req.user._id
                };
    res.redirect('/products');
})

router.get('/github',passport.authenticate('github',{scope:['user:email']}),async(req,res)=>{
    res.send({error:'register fail'})
})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/api/session/faillogin'} ),async (req, res) => {
    req.session.user = {
        name: `${req.user.first_name}`,
        email: req.user.email,
        id: req.user._id
    };
    res.redirect('/products')
})

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

router.get('/current', async (req, res) => {
    try {
      const currentUser =  req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        id: req.user._id
    };
      if (!currentUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(currentUser);
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  });



export default router;