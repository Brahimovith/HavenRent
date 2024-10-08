import mongoose from "mongoose";


    // user schema
const userSchema = new mongoose.Schema({
      name: { type: String, required: true },  
      password: {type: String, required: true},    
      age: { type: Number, required: true, min: [18, "min age is 18"] },  
      email: { type: String, required: true, unique: true },  
      city: String,
      dateInscription: { type: Date, default: Date.now } 
    });

const User = mongoose.model('User', userSchema);

export default User;