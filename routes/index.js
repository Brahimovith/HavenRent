import express from "express";
import { Router } from "express";
import users from "../controllers/user.js"
import owners from "../controllers/owners.js";
import ahtentication from "../controllers/ahtentication.js";
import authenticatetoken from "../middleware/authtoken.js";

const router = Router();

router.post('/api/user',users.createnewUser);
router.post('/api/owner',owners.createnewowner);
router.get('/api/connect', ahtentication.connect);
router.get('/api/disconnect',authenticatetoken, ahtentication.disconnect);

export default router;