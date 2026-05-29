import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove
} from "./equipmentType.controller.js";

import {
  authMiddleware
} from "../../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  getAll
);

router.get(
  "/:id",
  authMiddleware,
  getOne
);

router.post(
  "/",
  authMiddleware,
  create
);

router.put(
  "/:id",
  authMiddleware,
  update
);

router.delete(
  "/:id",
  authMiddleware,
  remove
);

export default router;