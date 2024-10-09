import jwt from "jsonwebtoken";

const secretkey = process.env.SECRETKEY || "madawatinit";
function authenticatetoken(req, res, next){
    const au = req.header('Authorization');
    const token = au.split(" ")[1];
    if(!token){
        res.status(500).json({error: "Unothorized ..."});
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