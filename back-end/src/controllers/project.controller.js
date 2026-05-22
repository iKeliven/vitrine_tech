import prisma from "../services/prisma.js";

const POINTS_FOR_PROJECT_CREATION = 50; // Pontos base por criar projeto
const XP_FOR_PROJECT_CREATION = 100; // XP por criar projeto

// Função para calcular nível baseado em XP
const calculateLevel = (totalXp) => {
  const LEVEL_CONFIG = {
    1: { min: 0, max: 100 },
    2: { min: 100, max: 250 },
    3: { min: 250, max: 450 },
    4: { min: 450, max: 700 },
    5: { min: 700, max: 1000 },
    6: { min: 1000, max: 1350 },
    7: { min: 1350, max: 1750 },
    8: { min: 1750, max: 2200 },
    9: { min: 2200, max: 2700 },
    10: { min: 2700, max: Infinity }
  };
  
  for (let level = 1; level <= 10; level++) {
    const config = LEVEL_CONFIG[level];
    if (totalXp >= config.min && totalXp < config.max) {
      return level;
    }
  }
  return 10;
};

export const createProject = async (req, res) => {
  const {
    title,
    description,
    type,
    techs,
    github,
    figma,
    behance,
    demo,
    participants
  } = req.body;

  if (!title || !type) {
    return res.status(400).json({ error: "Title e type são obrigatórios" });
  }

  const techsArray = Array.isArray(techs) ? techs : JSON.parse(techs || "[]");
  const participantsArray = Array.isArray(participants)
    ? participants
    : JSON.parse(participants || "[]");

  const createdProject = await prisma.project.create({
    data: {
      title,
      description,
      type,
      techs: techsArray,
      user: {
        connect: {
          id: req.user.id
        }
      },
      participants: {
        create: participantsArray.map((participant) => ({
          name: participant.name,
          avatar: participant.avatar || null
        }))
      },
      images: {
        create: req.files?.map((file) => ({
          url: file.filename
        })) || []
      },
      links: {
        create: {
          github,
          figma,
          behance,
          demo
        }
      }
    },
    include: {
      participants: true,
      images: true,
      links: true
    }
  });

  // Dar pontos ao usuário por criar projeto
  const userPoints = await prisma.userPoints.findUnique({
    where: { userId: req.user.id }
  });

  if (userPoints) {
    await prisma.userPoints.update({
      where: { userId: req.user.id },
      data: {
        balance: { increment: POINTS_FOR_PROJECT_CREATION },
        totalEarned: { increment: POINTS_FOR_PROJECT_CREATION }
      }
    });
  } else {
    await prisma.userPoints.create({
      data: {
        userId: req.user.id,
        balance: POINTS_FOR_PROJECT_CREATION,
        totalEarned: POINTS_FOR_PROJECT_CREATION
      }
    });
  }

  // Dar XP ao usuário por criar projeto
  const user = await prisma.user.findUnique({
    where: { id: req.user.id }
  });

  const newTotalXp = user.totalXp + XP_FOR_PROJECT_CREATION;
  const newLevel = calculateLevel(newTotalXp);

  await prisma.user.update({
    where: { id: req.user.id },
    data: {
      totalXp: newTotalXp,
      xp: XP_FOR_PROJECT_CREATION,
      level: newLevel
    }
  });

  // Registrar transação
  await prisma.transaction.create({
    data: {
      userId: req.user.id,
      type: "project_creation",
      pointsAmount: POINTS_FOR_PROJECT_CREATION,
      description: `Criação do projeto: ${title}`
    }
  });

  res.status(201).json({
    project: createdProject,
    pointsAwarded: POINTS_FOR_PROJECT_CREATION,
    xpAwarded: XP_FOR_PROJECT_CREATION,
    newLevel: newLevel,
    totalXp: newTotalXp
  });
};

export const getMyProjects = async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { userId: req.user.id },
    include: {
      participants: true,
      images: true,
      links: true
    }
  });

  res.json(projects);
};