import jwt from "jsonwebtoken";
import redisclt from "../utils/redis.js";

const secretkey = process.env.SECRETKEY || "madawatinit";
async function authenticatetoken(req, res, next){
    const au = req.header('Authorization');
    const token = au.split(" ")[1];
    const revoque = await redisclt.client.get(token);
    if(!token || revoque){
        res.status(500).json({error: "Unothorized or token revoqued..."});
    }
    else{
        jwt.verify(token, secretkey,(err, resultat)=>{
            if(err){
                res.status(500).json({error: "token invalid ..."});
            }
            else{

                const id = resultat.id;
                req.auth = {
                    id: id
                };
                next();
            }
        })
    }
}

export default authenticatetoken;