
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'ADMIN') {
        next();
    } else {
        res.redirect('/products');
    }
};

export default isAdmin