import express from "express";

// Swagger
import swaggerUi from "swagger-ui-express";
import swaggerJsonFile from "../swagger/show_swagger.json"

// Routes
import userRoutes from "./modules/user/user.route";
import authRoutes from "./modules/Auth/auth.route";
import { roleAuthMiddleware } from './common/middleware/role-auth.middleware';

// routes
const router = express.Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFile));
router.use("/users", roleAuthMiddleware(["USER", "ADMIN"]), userRoutes);
router.use("/", authRoutes);

export default router;