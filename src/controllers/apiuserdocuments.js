import { userDB } from "../services/services.js";

class filesload {
    documents= async (req, res) => {

        const {uid} = req.params
        const uploadedFile = req.file;
        const user = await userDB.getByID(uid);
        
        const documentObject = {
          name: uploadedFile.originalname, 
          reference: '/documents/' + uploadedFile.filename,
        };
        
        user.documents.push(documentObject);
        
        user.save()
            res.send('Archivo subido correctamente');
          }

    products=async (req, res) => {

        const {uid} = req.params
        const uploadedFile = req.file; 
        const user = await userDB.getByID(uid);
    
        const documentObject = {
          name: uploadedFile.originalname,
          reference: '/products/' + uploadedFile.filename, 
        };
        
        user.documents.push(documentObject);
        
        user.save()
            res.send('Archivo subido correctamente');
          }
    
    profile=async (req, res) => {

        const {uid} = req.params
        const uploadedFile = req.file;
        const user = await userDB.getByID(uid);
      
        const documentObject = {
          name: uploadedFile.originalname,
          reference: '/profile/' + uploadedFile.filename,
        };
        
        user.documents.push(documentObject);
        
        user.save()
            res.send('Archivo subido correctamente');
          }
    
}

export default filesload