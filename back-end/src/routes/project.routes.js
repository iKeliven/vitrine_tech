import { Router } from "express";

import auth from "../middlewares/auth.js";
import upload from "../config/upload.js";

import {
  createProject,
  getMyProjects,
  getProjects,
  getProjectById
} from "../controllers/project.controller.js";

const router = Router();

router.get("/", getProjects);
router.get("/me", auth, getMyProjects);
router.get("/:id", getProjectById);
router.post("/", auth, upload.array("images"), createProject);

export default router;