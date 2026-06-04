import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { upload } from "./upload.middleware.js";
import * as controller from "./upload.controller.js";

const router = Router();

router.post("/", authMiddleware, upload.single("image"), controller.upload);
router.get("/:serviceId", authMiddleware, controller.getByService);
router.delete("/:id", authMiddleware, controller.remove);

export default router;
