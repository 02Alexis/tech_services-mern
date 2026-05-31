import { Router } from "express";

import {
  getAll
} from "./user.controller.js";

import {
  authMiddleware
} from "../../middlewares/auth.middleware.js";

import {
  roleMiddleware
} from "../../middlewares/role.middleware.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAll
);

export default router;