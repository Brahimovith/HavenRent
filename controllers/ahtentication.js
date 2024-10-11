import jwt from "jsonwebtoken";
import User from "../models/users_model.js";
import Owner from "../models/owners_models.js";
import bcrypt from "bcrypt";
import redisclt from "../utils/redis.js";

const secretkey = process.env.SECRETKEY || "madawatinit";

class ahtentication{
    static async connect(req, res){
        let au = req.header('Authorization');
        console.log(au);
        let u = au.split(" ")[1];
        console.log(u);
        let decod = Buffer.from(u, 'base64').toString('ascii');
        console.log(decod);
        if(decod.split(":").length !== 2){
            res.status(500).json({error: "something is missing ... !"});
            
        }
        else{
            const email = decod.split(":")[0];
            console.log(email);
            const password = decod.split(":")[1];
            User.findOne({email:email})
            .then(user =>{
                if(!user){
                    res.status(500).json({error: "invalid email ..."});
                }
                else{
                    console.log(user)
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
                        res.status(500).json({error:"mmm"});
                    })
            
                }})
            .catch(error=>{
                res.status(500).json({error:"ppp"});
            })

        }


    }

    static async disconnect(req,res){
        const token = req.header('Authorization').split(" ")[1];
        const decoded = jwt.decode(token);
        console.log(decoded);
        console.log(decoded.exp);
        let expiration = decoded.exp*1000 - Date.now();
        expiration = Math.floor(expiration/1000);
        console.log(token);
        redisclt.client.setEx(token,expiration,'blacklist')
        .then(resu=>{
            console.log(resu);
            res.json({msg:"disconnected"});
        })
        .catch(err=>{
            console.log(err);
        })
        
    }
}

export default ahtentication;