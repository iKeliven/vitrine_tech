import prisma from "../services/prisma.js";
import bcrypt from "bcrypt";

export const registerCompany = async (req, res) => {
  const { name, email, cnpj, password, description, website, category, commissionRate } =
    req.body;

  if (!name || !email || !cnpj || !password) {
    return res
      .status(400)
      .json({ error: "Nome, email, CNPJ e senha são obrigatórios" });
  }

  const existingCompany = await prisma.company.findFirst({
    where: {
      OR: [{ email }, { cnpj }]
    }
  });

  if (existingCompany) {
    return res
      .status(409)
      .json({ error: "Email ou CNPJ já cadastrado" });
  }

  const hash = await bcrypt.hash(password, 10);

  const company = await prisma.company.create({
    data: {
      name,
      email,
      cnpj,
      password: hash,
      description,
      website,
      category,
      commissionRate: commissionRate || 0.15
    }
  });

  const { password: _password, ...safeCompany } = company;

  res.status(201).json(safeCompany);
};

export const getCompanies = async (req, res) => {
  const companies = await prisma.company.findMany({
    where: { verified: true },
    select: {
      id: true,
      name: true,
      description: true,
      logo: true,
      website: true,
      category: true
    }
  });

  res.json(companies);
};

export const getCompanyProfile = async (req, res) => {
  const { id } = req.params;

  const company = await prisma.company.findUnique({
    where: { id: parseInt(id) },
    include: {
      projectSponsors: {
        include: {
          project: {
            select: {
              id: true,
              title: true,
              description: true,
              techs: true
            }
          }
        }
      }
    }
  });

  if (!company) {
    return res.status(404).json({ error: "Empresa não encontrada" });
  }

  res.json(company);
};
