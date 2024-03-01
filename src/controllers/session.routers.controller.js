



class sessionctrl {

    getuser=async(req,res)=>{
        if (!req.user) return res.status(401).send({status: 'error', error: 'creadential invalid'})

    req.session.user = {
                    name: `${req.user.first_name} ${req.user.last_name}`,
                    email: req.user.email,
                    id: req.user._id
                };
    res.redirect('/products');
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
            const currentUser =  req.session.user = {
              name: `${req.user.first_name} ${req.user.last_name}`,
              email: req.user.email,
              id: req.user._id
          };
            if (!currentUser) {
              return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json(currentUser);
          } catch (error) {
            console.error('Error al obtener el usuario actual:', error);
            res.status(500).json({ message: 'Error del servidor' });
          }
    }

}

export default sessionctrl