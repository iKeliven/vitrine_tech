import { Router } from "express";
import companyAuth from "../middlewares/company-auth.js";
import {
  registerCompany,
  loginCompany,
  getCompanyProfile,
  updateCompanyProfile
} from "../controllers/company-auth.controller.js";
import upload from "../config/upload.js";

const router = Router();
router.post("/register", upload.single("logo"), registerCompany);
router.post("/login", loginCompany);
router.get("/profile", companyAuth, getCompanyProfile);
router.put("/profile", companyAuth, updateCompanyProfile);

export default router;
