import { Router } from "express";
import userManagerDB from "../dao/usersManagerDB.js";
import admin from "../middleware/admin.js";



const router = Router();
const userDB = new userManagerDB();


router.get("/",(req,res)=>{
    res.redirect('/login')
})

router.post("/login",admin, async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body)

    try {
        const user = await userDB.getUserB({ email:email, password:password });
        // console.log(user)

        if (!user) {
            // console.log();
            return res.status(401).send({ status: 'error', message: 'Usuario  incorrectos' });
            
        }
        if ( req.body.password !== user.password) {
            // console.log(req.body.password)
            // console.log(user.password)
            return res.status(401).send({ status: 'error', message: ' contraseña incorrectos' });
        }
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email
        };
        res.redirect('/products');
    } catch (error) {
        console.error('Error al autenticar al usuario:', error);
        res.status(500).send({ status: 'error', message: 'Error interno del servidor' });
    }
});


router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    try {
        const exists = await userDB.getUserByEmail({ email: req.body.email });
        if (exists) {
            return res.status(401).send({ status: 'error', message: 'El usuario ya existe' });
        }

        const user = await userDB.createUser({
            first_name:first_name,
            last_name:last_name,
            email:email,
            age:age,
            password:password,
        });

       
        res.redirect('/login');
      
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).send({ status: 'error', message: 'Error al crear el usuario' });
    }
});

router.post('/logout', async (req, res)=>{

    req.session.destroy(err => {
        if(err) return res.send({status:'Logout error', message: err})           
    })
    res.status(200).redirect('/login')
    console.log("borrado con exito")
})



export default router;