import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./equipmentType.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";

const router = Router();

router.get("/", authMiddleware, getAll);

router.get("/:id", authMiddleware, getOne);

router.post("/", authMiddleware, roleMiddleware("admin"), create);

router.put("/:id", authMiddleware, roleMiddleware("admin"), update);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), remove);

export default router;
