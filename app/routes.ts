import { express, apiLimiter, userRoutes, commonRoutes } from "./common/helper/imports.helper";

// routes
const router = express.Router();

router.use("/users", apiLimiter, userRoutes);
router.use("/", apiLimiter, commonRoutes);

export default router;