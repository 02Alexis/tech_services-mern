import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const authMiddleware = (
  req,
  res,
  next
) => {

  const authHeader =
    req.headers.authorization;

  if (!authHeader) {

    return res.status(401).json({
      message: "No autorizado"
    });

  }

  const token =
    authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch {

    return res.status(401).json({
      message: "Token inválido"
    });

  }

};