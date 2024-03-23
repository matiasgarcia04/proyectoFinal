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

//   router.get("/products", async (req, res) => {
//     const limit = parseInt(req.query.limit) || 10;
//     const pag = parseInt(req.query.pag) || 1;
//     const sort = req.query.sort === 'asc' ? 1 : req.query.sort === 'desc' ? -1 : '';
//     const {
//               docs,
//               hasPrevPage, 
//               hasNextPage,
//               prevPage, 
//               nextPage,
//               page 
//           } =await newProdDB.getProdPag(sort,limit, pag);
//     if (req.session.user) {
//       const { name } = req.session.user;
  
//       res.render('products', {
//           products: docs,
//           hasPrevPage,
//           hasNextPage,
//           prevPage,
//           nextPage,
//           page,
//           userName: name
//       });
//   } else {
      
//       res.render('products', {
//           products: docs,
//           hasPrevPage,
//           hasNextPage,
//           prevPage,
//           nextPage,
//           page
//       });
//   }});
  
//   router.get('/products/:id', async (req, res) => {
//     const productId = req.params.id;
//     const {title,description,price,stock,code} = await newProdDB.getProductlean({_id:productId});
//     const product= {title,description,price,stock,code}
//     res.render('productdetail', { product });
  
//   });

// router.get('/realtimeproducts', async (req, res) => {
//     const products = await newProdDB.getProductsLean();
//     res.render('realtimeproducts', { products });
//   });





export default router;