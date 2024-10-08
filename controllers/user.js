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
            password:newpass,
            age: age,
            email: email ,
            city: city
          });
          // Save user
      try {
        const result = await newUser.save();
        console.log('User created :', result);
        res.status(200).json({})
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


export default users;