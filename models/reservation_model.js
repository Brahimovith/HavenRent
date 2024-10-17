import mongoose, { Schema } from "mongoose";


   
const reservationSchema = new mongoose.Schema({
      user: {type: mongoose.Schema.Types.ObjectId, ref:'User',required:true},
      proprety: {type: mongoose.Schema.Types.ObjectId, ref:'Proprety',required:true},
      price:{type: Number},
      status: {type: String, enum: ['pending', 'confirmed', 'cancelled'],default:'pending'},
      dateInscription: { type: Date, default: Date.now } 
    });

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;