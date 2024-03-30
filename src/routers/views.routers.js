import { Router } from "express";
import preventprofile from "../middleware/preventprofile.js";
import preventLogin from "../middleware/preventLog.js";
// import ProdManagerDB from "../dao/ProdManagerDB.js";
import products from "../controllers/views.routers.controller.js";
import isAdmin from "../middleware/isAdmin.js";

const router = Router();
// const newProdDB = new ProdManagerDB();
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


export default router;