import configObjet from "../config/dotenv.js";

const admin = (req, res, next) => {
    const { email, password } = req.body;


    if (email === configObjet.adminEmail && password === configObjet.adminPassword) {
        
       req.session.user = {
            name: configObjet.adminEmail,
            email: email,
            role : 'ADMIN'
        };
       return res.redirect('/products');
        
    } else {
        req.session.isAdmin = false;
        
    }

    next();
};

export default admin
