import { Router, swaggerUi, swaggerJsonFile, roleAuthMiddleware } from "./common/helper/imports.helper";
import authRoutes from "./Auth/auth.route"
import userRoutes from "./user/user.route"

// routes
const router = Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFile));
router.use("/users", roleAuthMiddleware(["USER", "ADMIN"]), userRoutes);
router.use("/", authRoutes);

export default router;