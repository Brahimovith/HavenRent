import mongoose from "mongoose";
import Proprety from "../models/proprety_model.js";
import Reservation from "../models/reservation_model.js";
import Stripe from "stripe";
const stripe = Stripe('VOTRE_CLE_SECRETE_STRIPE');
import emailQueue from "../worker.js";

class reservation{
    static async usereservation(req, res){
        const type = req.auth.type;
        const {id} = req.body;
        if(!id){
            res.status(500).json({err:"id of proprety is missing"})
        }
        if(type !== 'user'){
            res.status(500).json({message:"you are not authorized ..."});
        }
        const idop = new mongoose.Types.ObjectId(id);
        const idu = new mongoose.Types.ObjectId(req.auth.id);
        const p = await Proprety.findById(idop);
        if(!p){
            res.status(500).json({message:"id is wrong ..."});
        }
        const newrservation =new Reservation({
            user: idu,
            proprety: idop,
            price: p.price
        });

        try{
            await newrservation.save();
            res.status(200).json({id:newrservation._id});
         }
    catch(err){
        console.log(err);
    }
    }


    static async paiement(req, res){
        const type = req.auth.type;
        const {id} = req.body;
        if(!id){
            res.status(500).json({err:"id of reservation is missing"})
        }
        if(type !== 'user'){
            res.status(500).json({message:"you are not authorized ..."});
        }
        const currency = "eur";
        const idob = new mongoose.Types.ObjectId(id);
        const resultat= await Reservation.findById(idob);
        if(resultat){
          try {
            const charge = stripe.charges.create({
              amount : resultat.price, 
              currency,  
              description: 'Paiement of reservation'
            });
             // Ajouter un job pour envoyer l'email de confirmation en arrière-plan
           emailQueue.add({
           to: req.auth.email, // Email du client
           subject: 'Confirmation of paiement',
           text: 'your paiment is succeful.'
            });
            resultat.status = 'confirmed';

            res.status(200).send({ success: true, charge });
          } catch (error) {
            resultat.status = 'cancelled'
            res.status(500).send({ success: false, error: error.message });
          }
        }
        else{
          console.log("not founded");
        }
       
    }

}

export default reservation;

