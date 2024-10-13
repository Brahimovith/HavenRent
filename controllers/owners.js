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
            age: age,
            email: email ,
            city: city
          });
          // Save
      try {
        const result = await newowner.save();
        console.log('Owner created :', result);
        res.status(200).json({username: username,email:email, id: newUser._id})
       } catch (error) {
          console.error('Error when create user :', error.message);
        
        }
        

      
        
      }


      static async getUsers() {
        try {
          const users = await User.find();  // Récupérer tous les utilisateurs
          console.log('Liste of users :', users);
        } catch (error) {
          console.error('Erreur lors de la récupération des utilisateurs :', error.message);
        }
      }


      static async getUserByEmail(email) {
        try {
          const user = await User.findOne({ email });
          console.log(user);
          return user;
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'utilisateur :', error.message);
        }
      }


      static async getUserByusername(username) {
        try {
          const user = await User.findOne({ username });
          return user;
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'utilisateur :', error.message);
        }
      }




      static async updateUser(email) {
        try {
          const result = await User.updateOne({ email }, { city: 'Lyon' });
          console.log(`updated user : ${result.nModified}`);
        } catch (error) {
          console.error('Error :', error.message);
        }
      }

      
      
      static async deleteUser(email) {
        try {
          const result = await User.deleteOne({ email });
          console.log(`${result.deletedCount} user deleted`);
        } catch (error) {
          console.error('Error :', error.message);
        }
      }



}


export default owners;