import prisma from "../services/prisma.js";

export const sponsorProject = async (req, res) => {
  const { projectId, companyId, amount } = req.body;

  if (!projectId || !companyId || !amount) {
    return res
      .status(400)
      .json({
        error: "projectId, companyId e amount são obrigatórios"
      });
  }

  // Verificar se o projeto existe
  const project = await prisma.project.findUnique({
    where: { id: parseInt(projectId) }
  });

  if (!project) {
    return res.status(404).json({ error: "Projeto não encontrado" });
  }

  // Verificar se a empresa existe
  const company = await prisma.company.findUnique({
    where: { id: parseInt(companyId) }
  });

  if (!company) {
    return res.status(404).json({ error: "Empresa não encontrada" });
  }

  // Calcular comissão e valor para o aluno
  const commission = amount * company.commissionRate;
  const studentAmount = amount - commission;

  // Criar patrocínio
  const sponsor = await prisma.projectSponsor.create({
    data: {
      projectId: parseInt(projectId),
      companyId: parseInt(companyId),
      amount,
      commission,
      studentAmount,
      status: "pending"
    }
  });

  res.status(201).json({
    message: "Patrocínio criado com sucesso",
    sponsor: {
      ...sponsor,
      details: {
        companyName: company.name,
        projectTitle: project.title,
        studentValue: studentAmount,
        platformCommission: commission
      }
    }
  });
};

export const approveSponsorship = async (req, res) => {
  const { sponsorId } = req.params;

  // Buscar patrocínio
  const sponsor = await prisma.projectSponsor.findUnique({
    where: { id: parseInt(sponsorId) },
    include: {
      project: true,
      company: true
    }
  });

  if (!sponsor) {
    return res.status(404).json({ error: "Patrocínio não encontrado" });
  }

  if (sponsor.status !== "pending") {
    return res
      .status(400)
      .json({ error: "Patrocínio já foi processado" });
  }

  // Calcular pontos para o aluno (ex: 1 ponto por real, pode ser customizado)
  const pointsToAward = Math.floor(sponsor.studentAmount);

  // Atualizar patrocínio
  const updatedSponsor = await prisma.projectSponsor.update({
    where: { id: parseInt(sponsorId) },
    data: {
      status: "approved",
      pointsRewarded: pointsToAward,
      approvedAt: new Date()
    }
  });

  // Criar ou atualizar UserPoints
  const userPoints = await prisma.userPoints.findUnique({
    where: { userId: sponsor.project.userId }
  });

  if (userPoints) {
    await prisma.userPoints.update({
      where: { userId: sponsor.project.userId },
      data: {
        balance: { increment: pointsToAward },
        totalEarned: { increment: pointsToAward }
      }
    });
  } else {
    await prisma.userPoints.create({
      data: {
        userId: sponsor.project.userId,
        balance: pointsToAward,
        totalEarned: pointsToAward
      }
    });
  }

  // Criar transação
  const transaction = await prisma.transaction.create({
    data: {
      userId: sponsor.project.userId,
      type: "company_sponsorship",
      pointsAmount: pointsToAward,
      description: `Patrocínio de ${sponsor.company.name} para o projeto "${sponsor.project.title}"`,
      sponsorId: parseInt(sponsorId)
    }
  });

  res.json({
    message: "Patrocínio aprovado com sucesso",
    sponsor: updatedSponsor,
    studentReward: {
      points: pointsToAward,
      amount: sponsor.studentAmount
    }
  });
};

export const rejectSponsorship = async (req, res) => {
  const { sponsorId } = req.params;

  const sponsor = await prisma.projectSponsor.findUnique({
    where: { id: parseInt(sponsorId) }
  });

  if (!sponsor) {
    return res.status(404).json({ error: "Patrocínio não encontrado" });
  }

  const updated = await prisma.projectSponsor.update({
    where: { id: parseInt(sponsorId) },
    data: { status: "rejected" }
  });

  res.json({ message: "Patrocínio rejeitado", sponsor: updated });
};

export const getProjectSponsorships = async (req, res) => {
  const { projectId } = req.params;

  const sponsorships = await prisma.projectSponsor.findMany({
    where: { projectId: parseInt(projectId) },
    include: {
      company: {
        select: {
          id: true,
          name: true,
          logo: true
        }
      }
    }
  });

  res.json(sponsorships);
};

export const getCompanyProjectOffers = async (req, res) => {
  const { companyId } = req.params;

  const offers = await prisma.projectSponsor.findMany({
    where: { companyId: parseInt(companyId) },
    include: {
      project: {
        select: {
          id: true,
          title: true,
          description: true,
          techs: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true
            }
          }
        }
      }
    }
  });

  res.json(offers);
};

export const getTopProjects = async (req, res) => {
  // Projetos com mais patrocínios
  const topProjects = await prisma.projectSponsor.groupBy({
    by: ["projectId"],
    _sum: {
      amount: true
    },
    _count: {
      id: true
    },
    orderBy: {
      _sum: {
        amount: "desc"
      }
    },
    take: 10
  });

  const projectIds = topProjects.map((p) => p.projectId);

  const projects = await prisma.project.findMany({
    where: {
      id: {
        in: projectIds
      }
    },
    include: {
      projectSponsors: {
        select: {
          amount: true,
          company: {
            select: {
              name: true
            }
          }
        }
      },
      user: {
        select: {
          name: true,
          avatar: true
        }
      }
    }
  });

  res.json(projects);
};
