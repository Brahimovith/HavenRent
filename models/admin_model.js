import mongoose from "mongoose";


    // admin schema
const adminSchema = new mongoose.Schema({
      name: { type: String, required: true },  
      username: { type: String, required: true, unique: true},
      password: {type: String, required: true},    
      age: { type: Number, required: true, min: [18, "min age is 18"] },  
      email: { type: String, required: true, unique: true },  
      city: String,
      avatar: {type: String, required: false},
      dateInscription: { type: Date, default: Date.now } 
    });

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;