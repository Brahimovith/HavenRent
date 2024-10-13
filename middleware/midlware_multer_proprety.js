import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import Owner from "../models/owners_models.js";
import fs from "fs";

const Mime_type = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
}
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        const idobj = new mongoose.Types.ObjectId(req.auth.id);
        console.log(idobj);
        Owner.findById({_id:idobj})
        .then(resultat=>{
          try{
            fs.mkdirSync(`./uploads/proprety/${resultat.email}`, {recursive: true});
            cb(null, `uploads/proprety/${resultat.email}`); //dossier ou les images seront stocké
          }
          catch(err){
            console.log('erreurr');
          }

        })
        .catch((err)=>{
          console.log(err);
        })
        
    },
    filename: (req, file,cb)=>{
        const name = req.auth.type + "_" +file.originalname.split(".")[0].split(" ").join("_") + Date.now() + '.' + Mime_type[file.mimetype];
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed (jpeg, jpg, png).'));
    }
  };

const upload1 = multer({
    storage: storage, 
    fileFilter: fileFilter}).single('image'); 

export default upload1;
