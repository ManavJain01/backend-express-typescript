import { Router } from "express";
import * as authController from "./auth.controller";
import { catchError } from "../../common/middleware/cath-error.middleware";

const router = Router();

router.get("/login", catchError, authController.loginUser);
router.get("/logout", catchError, authController.logoutUser);
router.get("/refresh-token", catchError, authController.refreshAccessToken);

export default router;