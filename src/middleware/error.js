import EErrors from "../errors/enum.js";

const handleErrors = (error, req, res, next) => {
    console.log(error)

    switch (error.code) {
        case EErrors.INVALID_TYPE_ERROR:
            return res.send({status: 'error', error: error.name})            
            break;
    
        default:
            return res.send({status: 'error', error: 'Error de server'})
            break;
    }
}

export default handleErrors