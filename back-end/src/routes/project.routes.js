import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../config/upload.js";
import { createProject, getMyProjects } from "../controllers/project.controller.js";

const router = Router();

router.post("/", auth, upload.array("images"), createProject);
router.get("/me", auth, getMyProjects);

export default router;