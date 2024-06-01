import { Router } from "express";
import preventprofile from "../middleware/preventprofile.js";
import preventLogin from "../middleware/preventLog.js";
import products from "../controllers/views.routers.controller.js";
import isAdmin from "../middleware/isAdmin.js";


const router = Router();
const controllerviews= new products();

router.get('/', (req,res)=>{
    res.render('index',{})});

router.get('/home', controllerviews.gotohome);
    

router.get('/login',preventLogin,(req,res)=>{
    res.render('login')
});

router.get('/register',preventLogin,(req,res)=>{
    res.render('register')
});

router.get('/perfil',preventprofile,(req,res)=>{
    res.render('perfil', { user: req.session.user })
});


router.get("/products", controllerviews.getProducts);
  
router.get('/products/:id', controllerviews.getproductbyid);

router.get('/realtimeproducts',isAdmin, controllerviews.gettorealtimeproducts);

router.get('/newpassword',(req,res)=>{
    res.render('newpassword')
});


router.get("/mensajenviado",(req,res)=>{
    res.render('mensajenviado')
})


router.get("/resetpassconfirm/:token",(req,res)=>{
    const { token } = req.params;
    res.render('resetpassconfirm', { token });
})

router.get("/fincompra",(req,res)=>{
    res.render('fincompra')
})

export default router;