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
  downloadPdf,
  tracking,
} from "./service.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";

const router = Router();

router.get("/tracking/:code", tracking);

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

router.delete("/:id", roleMiddleware("admin"), remove);

export default router;
