import mongoose, { Schema } from "mongoose";
import Owner from "./owners_models.js";


   
const propretySchema = new mongoose.Schema({
      title: { type: String, required: true, unique:true },  
      description: {type: String, required: true},    
      adress: { type: String, required: true},  
      price: {type: Number, required: true},
      photos: {type: String, required: false},
      owner: {type: mongoose.Schema.Types.ObjectId, ref:'Owner',required:true},
      dateInscription: { type: Date, default: Date.now } 
    });

const Proprety = mongoose.model('Proprety', propretySchema);

export default Proprety;