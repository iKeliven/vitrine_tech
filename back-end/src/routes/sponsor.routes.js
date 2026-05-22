import { Router } from "express";
import {
  sponsorProject,
  approveSponsorship,
  rejectSponsorship,
  getProjectSponsorships,
  getCompanyProjectOffers,
  getTopProjects
} from "../controllers/sponsor.controller.js";

const router = Router();

router.post("/", sponsorProject);
router.put("/:sponsorId/approve", approveSponsorship);
router.put("/:sponsorId/reject", rejectSponsorship);
router.get("/project/:projectId", getProjectSponsorships);
router.get("/company/:companyId/offers", getCompanyProjectOffers);
router.get("/top/projects", getTopProjects);

export default router;
