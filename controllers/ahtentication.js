import jwt from "jsonwebtoken";
import User from "../models/users_model.js";
import Owner from "../models/owners_models.js";
import bcrypt from "bcrypt";

const secretkey = process.env.SECRETKEY || "madawatinit";

class ahtentication{
    static async connect(req, res){
        const au = req.header['Authorization'];
        const u = au.split(" ")[1];
        const decod = Buffer.from(u, 'base26').toString('ascii');
        if(decod.split(":").length !== 2){
            res.status(500).json({error: "something is missing ... !"});
            
        }
        else{
            const email = decod.split(":")[0];
            const password = decod.split(":")[1];
            User.findOne(email)
            .then(user =>{
                if(!user){
                    res.status(500).json({error: "invalid email ..."});
                }
                else{
                    bcrypt.compare(password, user.password)
                    .then(valid => {
                        if(!valid){
                            res.status(500).json({error: "password is incorrect ..."});
                        }
                        else{
                            const token = jwt.sign({id: user._id}, secretkey, { expiresIn: '2h'});
                            res.status(200).json({token});
                        }
                    })
                    .catch(error=>{
                        res.status(500).json({error});
                    })
            
                }})
            .catch(error=>{
                res.status(500).json({error});
            })

        }


    }

    static async disconnect(req,res){
        
    }
}

export default ahtentication;