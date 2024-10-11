import multer from "multer";
import path from "path";

const Mime_type = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
}
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/profiles'); //dossier ou les images seront stocké
    },
    filename: (req, file,cb)=>{
        const name = file.originalname.split(" ").join("_") + Date.now() + '.' + Mime_type[file.mimetype];
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

upload = multer({
    storage: storage, 
    fileFilter: fileFilter}).single('image'); 
export default upload;