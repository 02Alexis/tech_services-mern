import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
  changeStatus,
  createObservation,
  dashboard,
  search,
  timeline,
  downloadPdf
} from "./service.controller.js";

import {
  authMiddleware
} from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getAll);

router.get("/dashboard", dashboard);

router.get("/search", search);

router.get("/:id/pdf", downloadPdf);

router.get("/:id/timeline", timeline);

router.patch("/:id/status", changeStatus);

router.post("/:id/observations", createObservation);

router.get("/:id", getOne);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;