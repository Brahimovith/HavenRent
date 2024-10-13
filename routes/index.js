import { Router } from "express";
import users from "../controllers/user.js"
import owners from "../controllers/owners.js";
import ahtentication from "../controllers/ahtentication.js";
import authenticatetoken from "../middleware/authtoken.js";
import upload from "../middleware/midlware_multer.js";
import profiles from "../controllers/controller_profiles.js";
import upload1 from "../middleware/midlware_multer_proprety.js";
import controllerproprety from "../controllers/controller_proprety.js";

const router = Router();

router.post('/api/user',users.createnewUser);
router.post('/api/owner',owners.createnewowner);
router.post('/api/:id/connect', ahtentication.connect);
router.get('/api/disconnect',authenticatetoken, ahtentication.disconnect);
router.post('/api/profil/addpic', authenticatetoken, upload, profiles.picture);
router.post('/api/owner/addproprety', authenticatetoken, controllerproprety.addprop);
router.post('/api/owner/proprety/addphotos', authenticatetoken,upload1, controllerproprety.addphoto);


export default router;