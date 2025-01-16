import express from "express";

// Routes
import userRoutes from "./modules/user/user.route";
import commonRoutes from "./modules/common/common.route";

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/", commonRoutes);

export default router;