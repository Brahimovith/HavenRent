import express from "express";
import { Router } from "express";
import users from "../controllers/user.js"
import owners from "../controllers/owners.js";
import ahtentication from "../controllers/ahtentication.js";
import authenticatetoken from "../middleware/authtoken.js";
import upload from "../middleware/midlware_multer.js";
import profiles from "../controllers/controller_profiles.js";

const router = Router();

router.post('/api/user',users.createnewUser);
router.post('/api/owner',owners.createnewowner);
router.post('/api/connect', ahtentication.connect);
router.get('/api/disconnect',authenticatetoken, ahtentication.disconnect);
router.post('api/profil/addpic', authenticatetoken,upload, profiles.picture);

export default router;