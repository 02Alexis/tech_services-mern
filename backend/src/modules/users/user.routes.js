import { Router } from "express";
import {
  getAll,
  create,
  update,
  remove,
  changeRole,
} from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";

const router = Router();

router.use(authMiddleware, roleMiddleware("admin"));

router.get("/", getAll);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), remove);

router.put("/:id/role", authMiddleware, roleMiddleware("admin"), changeRole);

export default router;
