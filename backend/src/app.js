import express from "express";
import cors from "cors";
import helmet from "helmet";
import equipmentTypeRoutes from "./modules/equipment-types/equipmentType.routes.js";

import authRoutes from "./modules/auth/auth.routes.js";
import { env } from "./config/env.js";

const app = express();

app.use(helmet());

app.use(express.json());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/equipment-types", equipmentTypeRoutes);

app.get("/", (req, res) => {

  res.status(200).json({
    message: "API funcionando"
  });

});

export default app;