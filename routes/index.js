import { Router } from "express";
import users from "../controllers/user.js"
import admin from "../controllers/controller_admin.js";
import owners from "../controllers/owners.js";
import ahtentication from "../controllers/ahtentication.js";
import authenticatetoken from "../middleware/authtoken.js";
import upload from "../middleware/midlware_multer.js";
import profiles from "../controllers/controller_profiles.js";
import upload1 from "../middleware/midlware_multer_proprety.js";
import controllerproprety from "../controllers/controller_proprety.js";
import reservation from "../controllers/controller_reservation.js";

const router = Router();

router.post('/api/admin',admin.createnewadmin);
router.post('/api/user',users.createnewUser);
router.post('/api/owner',owners.createnewowner);
router.post('/api/:id/connect', ahtentication.connect);
router.get('/api/disconnect',authenticatetoken, ahtentication.disconnect);
router.get('/api/admin/getusers',authenticatetoken,admin.getUsers);
router.post('/api/admin/userbyusername',authenticatetoken,admin.getUserByusername);
router.post('/api/admin/deleteuser',authenticatetoken,admin.deleteUser);
router.get('/api/admin/getowners',authenticatetoken,admin.getowner);
router.post('/api/admin/getownerbyusername',authenticatetoken,admin.getownerByusername);
router.post('/api/admin/deleteowner',authenticatetoken,admin.deleteowner);
router.get('/api/admin/getproprety',authenticatetoken,admin.getproproty);
router.post('/api/admin/deleteproprety',authenticatetoken,admin.deleteproproty);
router.post('/api/profil/addpic', authenticatetoken, upload, profiles.picture);
router.post('/api/owner/addproprety', authenticatetoken, controllerproprety.addprop);
router.post('/api/owner/:idproprety/addphotos', authenticatetoken,upload1, controllerproprety.addphoto);
router.post('/api/user/reservation', authenticatetoken, reservation.usereservation);
router.post('/api/user/paiement', authenticatetoken, reservation.paiement);

export default router;