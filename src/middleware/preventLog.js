const preventLogin = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/products');
    }
    next();
};


export default preventLogin;