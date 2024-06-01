
import { prodDB } from "../services/services.js";

class products {

    gotohome=async(req,res)=>{
        const products = await prodDB.getLean();
            res.render('home', { products });
    }

    getProducts= async(req,res)=>{
        const limit = parseInt(req.query.limit) || 10;
        const pag = parseInt(req.query.pag) || 1;
        const sort = req.query.sort === 'asc' ? 1 : req.query.sort === 'desc' ? -1 : '';

        const {
                  docs,
                  hasPrevPage, 
                  hasNextPage,
                  prevPage, 
                  nextPage,
                  page 
              } =await prodDB.paginate(sort,limit, pag);
        if (req.session.user) {
          const { name } = req.session.user;
          const cartid= req.session.user.cart
          
      
          res.render('products', {
              products: docs,
              hasPrevPage,
              hasNextPage,
              prevPage,
              nextPage,
              page,
              userName: name,
              cartid
          });
      } else {
          
          res.render('products', {
              products: docs,
              hasPrevPage,
              hasNextPage,
              prevPage,
              nextPage,
              page,
            
          });
      }

    }

    getproductbyid = async(req,res) =>{
        const productId = req.params.id;
        
        const product= await prodDB.getByIDlean({_id:productId})
            // Verifica si hay una sesión de usuario activa
            if (req.session.user) {
                const cartid = req.session.user.cart;
                res.render('productdetail', { product, cartid });
            } else {
                // Si no hay sesión de usuario, renderiza sin `cartid`
                res.render('productdetail', { product });
            }
        };

    gettorealtimeproducts=async(req,res)=>{
        const owner = req.session.user.role
        const products = await prodDB.getLean();
            res.render('realtimeproducts', { products, owner });
    }

}

export default products;