import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  getUserPoints,
  getRewards,
  redeemReward,
  getMyRewards,
  addXp,
  getLevel,
  getProgress,
  getRanking,
  getTopPlayers,
  getUserBadges
} from "../controllers/gamification.controller.js";

const router = Router();

// ROTAS DE PONTOS (existentes)
router.get("/points", auth, getUserPoints);
router.get("/rewards", getRewards);
router.post("/rewards/redeem", auth, redeemReward);
router.get("/my-rewards", auth, getMyRewards);

// ROTAS DE GAMIFICAÇÃO: XP/NÍVEL/PROGRESSÃO/RANKING
router.post("/xp/add", addXp); // Usar apenas internamente
router.get("/level/:userId", getLevel);
router.get("/progress/:userId", getProgress);
router.get("/ranking", getRanking);
router.get("/top-players", getTopPlayers);
router.get("/badges/:userId", getUserBadges);

export default router;
