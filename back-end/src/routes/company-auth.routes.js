import { Router } from "express";
import companyAuth from "../middlewares/company-auth.js";
import {
  registerCompany,
  loginCompany,
  getCompanyProfile,
  updateCompanyProfile
} from "../controllers/company-auth.controller.js";

const router = Router();

router.post("/register", registerCompany);
router.post("/login", loginCompany);
router.get("/profile", companyAuth, getCompanyProfile);
router.put("/profile", companyAuth, updateCompanyProfile);

export default router;
