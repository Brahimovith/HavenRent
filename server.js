import express from 'express'
import router from './routes/index.js'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = express();
const port = process.env.PORT || 3000;

 // URL of db MongoDB
 const uri = 'mongodb://localhost:27017/mydb';

 // Connexion to MongoDB
mongoose.connect(uri)
.then(() => console.log('Connexion to MongoDB succussufel'))
.catch((error) => console.error('Erreur lors de la connexion à MongoDB', error));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/web_static`));
app.use(express.json());
app.use('/', router);
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: `${__dirname}/web_static` });
});
app.listen(port, ()=>{
    console.log("listning in port 3000, host :localhost:3000/");
})