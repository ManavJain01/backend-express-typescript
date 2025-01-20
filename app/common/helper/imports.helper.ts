import express, { type Express, type Request, type Response } from "express"
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";

// Swagger
import swaggerUi from "swagger-ui-express";
import swaggerJsonFile from "../../../swagger/show_swagger.json"

// Imports helpers
import { apiLimiter } from "../middleware/rate-limiter.middlware";
import { roleAuthMiddleware } from "../middleware/role-auth.middleware";
import { decodeAccessToken, generateAccessTokenAndRefreshToken } from "./jwt.helper";

// Imports routes
import userRoutes from "../../modules/user/user.route"
import authRoutes from "../../modules/Auth/auth.route"

// Export types and other entities
export type { Express, Request, Response };
export { express, bodyParser, morgan, http,
  // Swagger
  swaggerUi, swaggerJsonFile,
  // Helpers
  apiLimiter, roleAuthMiddleware, generateAccessTokenAndRefreshToken, decodeAccessToken,
  // Routes
  userRoutes, authRoutes
};