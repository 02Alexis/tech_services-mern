import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
  changeStatus,
  createObservation
} from "./service.controller.js";

import {
  authMiddleware
} from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

router.patch("/:id/status", changeStatus);

router.post("/:id/observations", createObservation);

export default router;