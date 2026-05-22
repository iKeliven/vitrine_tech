import prisma from "../services/prisma.js";

export const getUserPoints = async (req, res) => {
  const userPoints = await prisma.userPoints.findUnique({
    where: { userId: req.user.id },
    select: {
      balance: true,
      totalEarned: true,
      totalSpent: true
    }
  });

  if (!userPoints) {
    return res.json({ balance: 0, totalEarned: 0, totalSpent: 0 });
  }

  res.json(userPoints);
};

export const getRewards = async (req, res) => {
  const rewards = await prisma.reward.findMany({
    where: { active: true },
    select: {
      id: true,
      name: true,
      description: true,
      pointsCost: true,
      quantity: true,
      image: true
    }
  });

  res.json(rewards);
};

export const redeemReward = async (req, res) => {
  const { rewardId } = req.body;

  if (!rewardId) {
    return res.status(400).json({ error: "rewardId obrigatório" });
  }

  const reward = await prisma.reward.findUnique({
    where: { id: parseInt(rewardId) }
  });

  if (!reward) {
    return res.status(404).json({ error: "Recompensa não encontrada" });
  }

  const userPoints = await prisma.userPoints.findUnique({
    where: { userId: req.user.id }
  });

  if (!userPoints || userPoints.balance < reward.pointsCost) {
    return res.status(400).json({ error: "Pontos insuficientes" });
  }

  if (reward.quantity <= 0) {
    return res.status(400).json({ error: "Recompensa indisponível" });
  }

  // Criar resgate de recompensa
  const userReward = await prisma.userReward.create({
    data: {
      userId: req.user.id,
      rewardId: reward.id,
      status: "pending"
    }
  });

  // Atualizar pontos do usuário
  await prisma.userPoints.update({
    where: { userId: req.user.id },
    data: {
      balance: { decrement: reward.pointsCost },
      totalSpent: { increment: reward.pointsCost }
    }
  });

  // Registrar transação
  await prisma.transaction.create({
    data: {
      userId: req.user.id,
      type: "reward_redemption",
      pointsAmount: -reward.pointsCost,
      description: `Resgate de ${reward.name}`
    }
  });

  res.status(201).json({
    message: "Recompensa solicitada com sucesso",
    userReward
  });
};

export const getMyRewards = async (req, res) => {
  const myRewards = await prisma.userReward.findMany({
    where: { userId: req.user.id },
    include: {
      reward: true
    },
    orderBy: { createdAt: "desc" }
  });

  res.json(myRewards);
};

// ==================== GAMIFICAÇÃO: XP/NÍVEL/PROGRESSÃO/RANKING ====================

// Tabela de níveis com XP necessário
const LEVEL_CONFIG = {
  1: { min: 0, max: 100, xpRequired: 100 },
  2: { min: 100, max: 250, xpRequired: 150 },
  3: { min: 250, max: 450, xpRequired: 200 },
  4: { min: 450, max: 700, xpRequired: 250 },
  5: { min: 700, max: 1000, xpRequired: 300 },
  6: { min: 1000, max: 1350, xpRequired: 350 },
  7: { min: 1350, max: 1750, xpRequired: 400 },
  8: { min: 1750, max: 2200, xpRequired: 450 },
  9: { min: 2200, max: 2700, xpRequired: 500 },
  10: { min: 2700, max: Infinity, xpRequired: 500 }
};

// Calcula nível baseado em XP total
const calculateLevel = (totalXp) => {
  for (let level = 1; level <= 10; level++) {
    const config = LEVEL_CONFIG[level];
    if (totalXp >= config.min && totalXp < config.max) {
      return level;
    }
  }
  return 10; // Máximo nível
};

// Adicionar XP ao usuário
export const addXp = async (req, res) => {
  const { userId, xpAmount, reason } = req.body;

  if (!userId || !xpAmount || xpAmount <= 0) {
    return res.status(400).json({ error: "userId e xpAmount válidos são obrigatórios" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const newTotalXp = user.totalXp + xpAmount;
    const newLevel = calculateLevel(newTotalXp);

    // Atualizar user com novo XP e nível
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        totalXp: newTotalXp,
        xp: xpAmount,
        level: newLevel
      }
    });

    // Se subiu de nível, registrar no histórico
    if (newLevel > user.level) {
      await prisma.userLevel.create({
        data: {
          userId,
          level: newLevel,
          xpRequired: LEVEL_CONFIG[newLevel].xpRequired
        }
      }).catch(() => {}); // Ignore se já existe
    }

    // Atualizar progresso
    const levelConfig = LEVEL_CONFIG[newLevel];
    const currentXpInLevel = newTotalXp - levelConfig.min;
    const progressPercent = (currentXpInLevel / levelConfig.xpRequired) * 100;

    await prisma.userProgress.upsert({
      where: { userId },
      update: {
        currentXp: currentXpInLevel,
        maxXpForLevel: levelConfig.xpRequired,
        progressPercent: Math.min(progressPercent, 100)
      },
      create: {
        userId,
        currentXp: currentXpInLevel,
        maxXpForLevel: levelConfig.xpRequired,
        progressPercent: Math.min(progressPercent, 100)
      }
    });

    res.json({
      user: updatedUser,
      reason,
      xpGained: xpAmount,
      levelUp: newLevel > user.level,
      currentLevel: newLevel,
      totalXp: newTotalXp
    });
  } catch (error) {
    console.error("Erro ao adicionar XP:", error);
    res.status(500).json({ error: "Erro ao adicionar XP" });
  }
};

// Obter nível e informações do usuário
export const getLevel = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        name: true,
        level: true,
        totalXp: true,
        xp: true,
        avatar: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const progress = await prisma.userProgress.findUnique({
      where: { userId: parseInt(userId) }
    });

    const nextLevelConfig = LEVEL_CONFIG[user.level + 1] || LEVEL_CONFIG[10];

    res.json({
      user,
      currentLevel: user.level,
      totalXp: user.totalXp,
      progress: progress || {
        currentXp: 0,
        maxXpForLevel: LEVEL_CONFIG[user.level].xpRequired,
        progressPercent: 0
      },
      nextLevelXpRequired: nextLevelConfig.xpRequired,
      levelConfig: LEVEL_CONFIG[user.level]
    });
  } catch (error) {
    console.error("Erro ao obter nível:", error);
    res.status(500).json({ error: "Erro ao obter nível" });
  }
};

// Obter progresso detalhado
export const getProgress = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const progress = await prisma.userProgress.findUnique({
      where: { userId: parseInt(userId) }
    });

    const levelHistory = await prisma.userLevel.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { level: "asc" }
    });

    const currentLevelConfig = LEVEL_CONFIG[user.level];
    const nextLevelConfig = LEVEL_CONFIG[user.level + 1] || LEVEL_CONFIG[10];

    res.json({
      userId: user.id,
      name: user.name,
      currentLevel: user.level,
      totalXp: user.totalXp,
      currentXp: progress?.currentXp || 0,
      xpForNextLevel: nextLevelConfig.xpRequired,
      progressPercent: progress?.progressPercent || 0,
      currentLevelMinXp: currentLevelConfig.min,
      currentLevelMaxXp: currentLevelConfig.max,
      xpToNextLevel: nextLevelConfig.min - user.totalXp,
      levelHistory,
      estimatedNextLevelDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
  } catch (error) {
    console.error("Erro ao obter progresso:", error);
    res.status(500).json({ error: "Erro ao obter progresso" });
  }
};

// Obter ranking global
export const getRanking = async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;

  try {
    const ranking = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        avatar: true,
        level: true,
        totalXp: true,
        course: true,
        createdAt: true
      },
      orderBy: [
        { level: "desc" },
        { totalXp: "desc" },
        { createdAt: "asc" }
      ],
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    // Adicionar posição
    const rankingWithPosition = ranking.map((user, index) => ({
      position: parseInt(offset) + index + 1,
      ...user
    }));

    const totalUsers = await prisma.user.count();

    res.json({
      ranking: rankingWithPosition,
      total: totalUsers,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error("Erro ao obter ranking:", error);
    res.status(500).json({ error: "Erro ao obter ranking" });
  }
};

// Obter top 5 jogadores
export const getTopPlayers = async (req, res) => {
  const { limit = 5 } = req.query;

  try {
    const topPlayers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        avatar: true,
        level: true,
        totalXp: true,
        course: true
      },
      orderBy: [
        { level: "desc" },
        { totalXp: "desc" }
      ],
      take: parseInt(limit)
    });

    res.json(topPlayers);
  } catch (error) {
    console.error("Erro ao obter top players:", error);
    res.status(500).json({ error: "Erro ao obter top players" });
  }
};

// Obter badges/achievements
export const getUserBadges = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Badges baseado em nível
    const badges = [];
    if (user.level >= 1) badges.push({ id: 1, name: "Iniciante", icon: "🌱", level: 1 });
    if (user.level >= 3) badges.push({ id: 2, name: "Aprendiz", icon: "📚", level: 3 });
    if (user.level >= 5) badges.push({ id: 3, name: "Profissional", icon: "💼", level: 5 });
    if (user.level >= 7) badges.push({ id: 4, name: "Mestre", icon: "🏆", level: 7 });
    if (user.level >= 10) badges.push({ id: 5, name: "Lenda", icon: "👑", level: 10 });

    res.json({
      userId: user.id,
      level: user.level,
      totalXp: user.totalXp,
      badges
    });
  } catch (error) {
    console.error("Erro ao obter badges:", error);
    res.status(500).json({ error: "Erro ao obter badges" });
  }
};
