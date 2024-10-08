import express from "express";
import { Router } from "express";
import users from "../controllers/user.js"
import owners from "../controllers/owners.js";

const router = Router();

router.post('/api/user',users.createnewUser);
router.post('/api/owner',owners.createnewowner);

export default router;