import { Router, catchError, authController } from "../common/helper/imports.helper";

const router = Router();

router.post("/login", catchError, authController.loginUser);
router.post("/logout", catchError, authController.logoutUser);
router.post("/forgot-password", catchError, authController.forgotPassword);
router.post("/reset-password", catchError, authController.resetPassword);
router.post("/refresh-token", catchError, authController.refreshAccessToken);

export default router;