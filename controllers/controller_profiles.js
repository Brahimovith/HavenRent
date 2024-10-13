import Owner from "../models/owners_models.js";
import User from "../models/users_model.js";
import path from "path";


class profiles{
    static async picture(req, res){
        if (!req.file) {
            return res.status(400).json({error: 'No file uploaded.'});
          }
          const p = path.resolve('uploads', 'profiles', req.file.filename);
          console.log(p);
          if(req.auth.type === "user"){
            const id = req.auth.id;
            await User.updateOne({_id: id}, { avatar: p });
          }
          if(req.auth.type === "admin"){
            const id = req.auth.id;
            await owner.updateOne({_id: id}, { avatar: p });
          }
          res.status(200).json({message: `File uploaded successfully: ${req.file.filename}`});
    }

}


export default profiles;