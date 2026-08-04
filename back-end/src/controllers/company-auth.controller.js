import prisma from "../services/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerCompany = async (req, res) => {
  const { name, email, password, category } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Nome, email e senha são obrigatórios"
    });
  }

  const existingCompany = await prisma.company.findUnique({
    where: { email }
  });

  if (existingCompany) {
    return res.status(409).json({
      error: "Email já cadastrado"
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const company = await prisma.company.create({
    data: {
      name,
      email,
      password: hash,
      category,
      cnpj: `pendente-${Date.now()}`,
      commissionRate: 0.15,
      logo: req.file ? req.file.filename : null
    }
  });

  const token = jwt.sign(
    { id: company.id, type: "company" },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  const { password: _password, ...safeCompany } = company;

  res.status(201).json({
    company: safeCompany,
    token
  });
};

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  const company = await prisma.company.findUnique({
    where: { email }
  });

  if (!company) {
    return res.status(404).json({ error: "Empresa não encontrada" });
  }

  if (!company.active) {
    return res.status(403).json({ error: "Empresa desativada" });
  }

  const valid = await bcrypt.compare(password, company.password);

  if (!valid) {
    return res.status(401).json({ error: "Senha inválida" });
  }

  const token = jwt.sign({ id: company.id, type: "company" }, JWT_SECRET, { expiresIn: "7d" });

  const { password: _password, ...safeCompany } = company;

  res.json({
    company: safeCompany,
    token
  });
};

export const getCompanyProfile = async (req, res) => {
  const company = await prisma.company.findUnique({
    where: { id: req.company.id },
    select: {
      id: true,
      name: true,
      email: true,
      cnpj: true,
      description: true,
      logo: true,
      website: true,
      category: true,
      commissionRate: true,
      verified: true,
      active: true,
      createdAt: true
    }
  });

  if (!company) {
    return res.status(404).json({ error: "Empresa não encontrada" });
  }

  res.json(company);
};

export const updateCompanyProfile = async (req, res) => {
  const { name, description, website, category, logo } = req.body;

  const company = await prisma.company.update({
    where: { id: req.company.id },
    data: {
      name,
      description,
      website,
      category,
      logo
    },
    select: {
      id: true,
      name: true,
      email: true,
      description: true,
      logo: true,
      website: true,
      category: true
    }
  });

  res.json(company);
};
