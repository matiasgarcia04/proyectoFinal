// import ProdManagerDB from "../dao/ProdManagerDB.js";
import { prodDB } from "../services/services.js";

// const prodDB = new ProdManagerDB();

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
          
      
          res.render('products', {
              products: docs,
              hasPrevPage,
              hasNextPage,
              prevPage,
              nextPage,
              page,
              userName: name
          });
      } else {
          
          res.render('products', {
              products: docs,
              hasPrevPage,
              hasNextPage,
              prevPage,
              nextPage,
              page
          });
      }

    }
    getproductbyid = async(req,res) =>{
        // req.session.user = {
        //     name: `${req.user.first_name} ${req.user.last_name}`,
        //     email: req.user.email,
        //     id: req.user._id,
        //     cart: req.user.cart
        // };
        // const {cart} = req.session.user
        
        const productId = req.params.id;
        const {title,description,price,stock,code} = await prodDB.getByIDlean({_id:productId});
        const product= {title,description,price,stock,code}
            res.render('productdetail', { product });
        
    };

    gettorealtimeproducts=async(req,res)=>{
        const products = await prodDB.getLean();
            res.render('realtimeproducts', { products });
    }

}

export default products;