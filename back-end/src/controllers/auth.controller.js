import prisma from "../services/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(401).json({ error: "Senha inválida" });

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

  res.json({ token });
};