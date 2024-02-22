

const admin = (req, res, next) => {
    const { email, password } = req.body;


    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        
       req.session.user = {
            name: `adminCoder@coder.com`,
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
