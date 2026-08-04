import { Router } from "express";
import { register, getProfile } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../config/upload.js";

const router = Router();

router.post("/register", upload.single("avatar"), register);
router.get("/me", auth, getProfile);

export default router;