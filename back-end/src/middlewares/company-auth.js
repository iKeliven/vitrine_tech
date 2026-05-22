import jwt from "jsonwebtoken";
import prisma from "../services/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export default async function companyAuth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token obrigatório" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.type !== "company") {
      return res.status(401).json({ error: "Token inválido para empresa" });
    }

    const company = await prisma.company.findUnique({
      where: { id: decoded.id }
    });

    if (!company) {
      return res.status(401).json({ error: "Empresa não encontrada" });
    }

    req.company = company;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}
