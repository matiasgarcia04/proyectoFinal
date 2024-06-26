
import UserDTO from "../dto/DtoUser.js";


class sessionctrl {
  
  
  getuser=async(req,res)=>{
    if (!req.user) return res.status(401).send({status: 'error', error: 'creadential invalid'})

    req.session.user = {
                        name: `${req.user.first_name} ${req.user.last_name}`,
                        email: req.user.email,
                        id: req.user._id,
                        cart: req.user.cart,
                        role:req.user.role
                    };
    // const user= req.session.user;
    // const expiresIn = '24h';
    // const secretKey = configObjet.private_key;
    // const token = jwt.sign({ user, expiresIn }, secretKey);

// res.cookie('token', token, {
// httpOnly: true, maxAge: 1000 * 60 * 60 * 24
// }).redirect('/products')
res.redirect('/products')
}
  

    githubcallback=async(req,res)=>{
        req.session.user = {
            name: `${req.user.first_name}`,
            email: req.user.email,
            id: req.user._id
        };
        res.redirect('/products')
    };

    current=async(req,res)=>{
      try {

           
          const currentUser = {
            first_name: req.user.first_name,
            last_name:req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
            id: req.user._id
        };
       
        const user= new UserDTO(currentUser)
       
      
          if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }
          res.status(200).json(user);
        } catch (error) {
     
          req.logger.error('Error al obtener el usuario actual:', error);
          res.status(500).json({ message: 'Error del servidor' });
        }
    }

}

export default sessionctrl