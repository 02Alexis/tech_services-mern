import { Router } from "express";
import { getAll, read } from "./notification.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getAll);

router.patch("/:id/read", read);

export default router;
