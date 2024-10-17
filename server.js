import express from 'express'
import router from './routes/index.js'
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;

 // URL of db MongoDB
 const uri = 'mongodb://localhost:27017/mydb';

 // Connexion to MongoDB
mongoose.connect(uri)
.then(() => console.log('Connexion to MongoDB succussufel'))
.catch((error) => console.error('Erreur lors de la connexion à MongoDB', error));

app.use(express.json());
app.use('/', router);

app.listen(port, ()=>{
    console.log("listning in port 3000, host :localhost:3000/");
})