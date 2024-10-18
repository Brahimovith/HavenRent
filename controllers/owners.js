import bcrypt from "bcrypt";
import Owner from "../models/owners_models.js";


class owners{  
    static async createnewowner(req, res) {
        const {username, password, name, age, email, city} = req.body;
        const o1 = await Owner.findOne({ email });
        const o2 = await Owner.findOne({username});
        console.log(o1);
        if(o1 || o2){
            res.status(500).json({error: "Already exist"});
        }

        if(!username || !password || !name || !age || !city || !email)
        {
            res.status(500).json({error:"some informations are missing! ..."});
            
        }

        const newpass = await bcrypt.hash(password,10)
        

        const newowner = new Owner({
            name: name ,
            password:newpass,
            username:username,
            age: age,
            email: email ,
            city: city
          });
          // Save
      try {
        const result = await newowner.save();
        console.log('Owner created :', result);
        res.status(200).json({username: username,email:email, id: newowner._id})
       } catch (error) {
          console.error('Error when create user :', error.message);
        
        }
        

      
        
      }


     
}


export default owners;