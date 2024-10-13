import mongoose from "mongoose";
import Proprety from "../models/proprety_model.js";


class controllerproprety{
    static async addprop(req, res){
        const {title,description,adress,price} = req.body;
        const owner = req.auth.email;
        const objid = new mongoose.Types.ObjectId(req.auth.id);
        const t = mongoose.Types.ObjectId.isValid(objid);
        if(t){
            if(!title || !description || !adress || !price){
                res.status(500).json({error: "somethings is missing ... (you must provied title, description, adress, price,photos"})
            }
            else{
                const newprop = new Proprety({
                    title: title,
                    description: description,
                    adress: adress,
                    price: price,
                    owner: owner 
                });
                
                try{
                    const result = await newprop.save();
                    res.status(200).json({id: newprop._id, title: newprop.title});
                }
                catch(error) {
                    res.status(500).json({error});
                }
            }
        }
        else{
            res.status(400).json({error: "you are not authorized ..."})
        }
       
    }

    static async addphoto(req,res){
        if(!req.file){
            res.status(500).json({erreur: "error1"});
        }
        else {
            const i = new mongoose.Types.ObjectId(req.auth.id);
            console.log(i);
            Proprety.find({owner: req.auth.email}).populate('Owner').exec()
            .then((result)=>{
                const p = path.resolve('uploads', 'proprety',`${req.auth.email}`,req.file.filename);
                console.log(result);
                result.photos = p;
                console.log(p);
                res.status(200).json({message: `the file is saved in ${p} `});
            })
            .catch((err)=>{
                res.status(500).json({erreur: "error"});
            })
        }
    }


}

export default controllerproprety;