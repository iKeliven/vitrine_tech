import { Router } from "express";
import {
  registerCompany,
  getCompanies,
  getCompanyProfile
} from "../controllers/company.controller.js";

const router = Router();

router.post("/", registerCompany);
router.get("/", getCompanies);
router.get("/:id", getCompanyProfile);

export default router;
