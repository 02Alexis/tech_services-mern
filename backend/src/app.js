import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./modules/users/user.routes.js";
import equipmentTypeRoutes from "./modules/equipment-types/equipmentType.routes.js";
import serviceRoutes from "./modules/services/service.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import { env } from "./config/env.js";
import errorMiddleware from "./middlewares/error.middleware.js";

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
app.use("/api/users", userRoutes);
app.use("/api/equipment-types", equipmentTypeRoutes);
app.use("/api/services", serviceRoutes);

app.use(errorMiddleware);

app.get("/", (req, res) => {

  res.status(200).json({
    message: "API funcionando"
  });

});

export default app;