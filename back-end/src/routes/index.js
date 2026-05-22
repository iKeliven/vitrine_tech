import { Router } from "express";
import authRoutes from "./auth.routes.js";
import projectRoutes from "./project.routes.js";
import userRoutes from "./user.routes.js";
import gamificationRoutes from "./gamification.routes.js";
import companyRoutes from "./company.routes.js";
import companyAuthRoutes from "./company-auth.routes.js";
import sponsorRoutes from "./sponsor.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/company-auth", companyAuthRoutes);
router.use("/projects", projectRoutes);
router.use("/users", userRoutes);
router.use("/gamification", gamificationRoutes);
router.use("/companies", companyRoutes);
router.use("/sponsors", sponsorRoutes);

export default router;