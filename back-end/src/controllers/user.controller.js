import prisma from "../services/prisma.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { name, email, password, lastName, cpf, matricula, course, turma } = req.body;
  const avatar = req.file ? req.file.filename : null;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return res.status(409).json({ error: "Email já cadastrado" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
      lastName,
      cpf,
      matricula,
      course,
      turma,
      avatar
    }
  });

  const { password: _password, ...safeUser } = user;

  res.status(201).json(safeUser);
};

export const getProfile = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      name: true,
      lastName: true,
      email: true,
      cpf: true,
      matricula: true,
      course: true,
      turma: true,
      avatar: true,
      createdAt: true
    }
  });

  res.json(user);
};