import { express, swaggerUi, swaggerJsonFile, apiLimiter, userRoutes, authRoutes, roleAuthMiddleware } from "./common/helper/imports.helper";

// routes
const router = express.Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFile));
router.use("/users", apiLimiter, roleAuthMiddleware(["USER", "ADMIN"]), userRoutes);
router.use("/", authRoutes);

export default router;