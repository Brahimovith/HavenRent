import bcrypt from "bcrypt";
import User from "../models/users_model.js";


class users{  
    static async createnewUser(req, res) {
        const {username, password, name, age, email, city} = req.body;
        
        const user1 = await User.findOne({ email });
        const user2 = await User.findOne({username});
        console.log(user1);
        if(user1 || user2){
            res.status(500).json({error: "Already exist"});
        }

        if(!username || !password || !name || !age || !city || !email)
        {
            res.status(500).json({error:"some informations are missing! ..."});
            
        }

        const newpass = await bcrypt.hash(password,10)
        

        const newUser = new User({
            name: name ,
            username: username,
            password:newpass,
            age: age,
            email: email ,
            city: city
          });
          // Save user
      try {
        const result = await newUser.save();
        console.log('User created :', result);
        res.status(200).json({username: username,email:email, id: newUser._id})
       } catch (error) {
          console.error('Error when create user :', error.message);
        
        }
        

      
        
      }

}


export default users;