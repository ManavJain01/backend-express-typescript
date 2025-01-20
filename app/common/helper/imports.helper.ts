import express, { type Express, type Request, type Response } from "express"
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";

// Imports helpers
import { apiLimiter } from "../middleware/rate-limiter.middlware";
import { roleAuthMiddleware } from "../middleware/role-auth.middleware";
import { decodeAccessToken, generateAccessTokenAndRefreshToken } from "./jwt.helper";

// Imports routes
import userRoutes from "../../modules/user/user.route"
import commonRoutes from "../../modules/common/common.route"

// Export types and other entities
export type { Express, Request, Response };
export { express, bodyParser, morgan, http,
  // Helpers
  apiLimiter, roleAuthMiddleware, generateAccessTokenAndRefreshToken, decodeAccessToken,
  // Routes
  userRoutes, commonRoutes
};