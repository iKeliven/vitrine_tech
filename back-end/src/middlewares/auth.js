import jwt from "jsonwebtoken";
import prisma from "../services/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export default async function auth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token obrigatório" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}