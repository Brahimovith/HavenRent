import Admin from "../models/admin_model.js";
import User from "../models/users_model.js";
import Owner from "../models/owners_models.js";
import Proprety from "../models/proprety_model.js";
import bcrypt from "bcrypt";


class admin{

    static async createnewadmin(req, res){
      const {username, password, name, age, email, city} = req.body;
      const admin1 = await Admin.findOne({ email });
      const admin2 = await Admin.findOne({username});
      
      if(admin1 || admin2){
          res.status(500).json({error: "Already exist"});
      }

      if(!username || !password || !name || !age || !city || !email)
      {
          res.status(500).json({error:"some informations are missing! ..."});
          
      }
      else{
      const newpass = await bcrypt.hash(password,10)
      

      const newadmin = new Admin({
          name: name ,
          password:newpass,
          age: age,
          email: email ,
          city: city
        });
        // Save 
       try {
         const result = await newadmin.save();
         console.log('Admin created :', result);
         res.status(200).json({username: username,email:email, id: newadmin._id})
        } 
       catch (error) {
           console.error('Error when create user :', error.message);
       
          }
        }
     }

    static async getUsers(req, res) {
        try {
          const users = await User.find();  // Récupérer tous les utilisateurs
          console.log('Liste of users :', users);
          res.status(200).json({users});
        } catch (error) {
          console.error('Erreur lors de la récupération des utilisateurs :', error.message);
        }
      }



      static async getUserByusername(req,res) {
        const {username} = req.body;
        try {
          const user = await User.findOne({ username });
          res.status(200).json({user});
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'utilisateur :', error.message);
        }
      }

      
      static async deleteUser(req,res) {
        const {email} = req.body;
        try {
          const result = await User.deleteOne(email);
          res.status(200).json({message:`${result.deletedCount} user deleted`});

        } catch (error) {
          console.error('Error :', error.message);
        }
      }


      static async getowner(req, res) {
        try {
          const owns = await Owner.find();  // Récupérer tous les utilisateurs
          console.log('Liste of users :', owns);
          res.status(200).json({owns});
        } catch (error) {
          console.error('Erreur lors de la récupération des utilisateurs :', error.message);
        }
      }



      static async getownerByusername(req,res) {
        const {username} = req.body;
        try {
          const u = await Owner.findOne({ username });
          res.status(200).json({owner:u});
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'utilisateur :', error.message);
        }
      }

      
      static async deleteowner(req,res) {
        const {email} = req.body;
        try {
          const result = await Owner.deleteOne(email);
          res.status(200).json({message:`${result.deletedCount} owner deleted`});

        } catch (error) {
          console.error('Error :', error.message);
        }
      }

      static async getproproty(req,res) {
        try {
          const p = await Proprety.find();  
          console.log('Liste of users :', p);
          res.status(200).json({p});
        } catch (error) {
          console.error('Erreur lors de la récupération des utilisateurs :', error.message);
        }
      }

      static async deleteproproty(req,res) {
        const {id} = req.body;
        try {
          const result = await Proprety.deleteOne({ _id: id });
          res.statu(200).json({message:`${result.deletedCount} proprety deleted`});

        } catch (error) {
          console.error('Error :', error.message);
        }
      }

}

      

export default admin;