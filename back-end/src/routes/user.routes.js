import { Router } from "express";
import { register, getProfile } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/register", register);
router.get("/me", auth, getProfile);

export default router;