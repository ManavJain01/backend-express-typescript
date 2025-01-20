import express, { Router, type Express, type Request, type Response, type NextFunction, type ErrorRequestHandler } from "express"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import http from "http";
import process from "process";
import path from "path";
import createHttpError from "http-errors";
import createError from "http-errors";
import expressAsyncHandler from "express-async-handler";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import rateLimit from 'express-rate-limit';
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import bcrypt from "bcrypt";

// mongoose
import mongoose, { model } from "mongoose";

// passport
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

// Swagger
import swaggerUi from "swagger-ui-express";
import swaggerJsonFile from "../../../swagger/show_swagger.json"

// dotenv
import dotenv from "dotenv";

// jwt
import jwt from "jsonwebtoken";

// Imports helpers
import { decodeAccessToken, decodeRefreshToken, generateAccessTokenAndRefreshToken } from "./jwt.helper";
import { type ErrorResponse, createResponse } from "./response.hepler";
import { loadConfig } from "./config.hepler";

// Middlewares
import { apiLimiter } from "../middleware/rate-limiter.middlware";
import { roleAuthMiddleware } from "../middleware/role-auth.middleware";
import { catchError } from "../middleware/cath-error.middleware";
import errorHandler from "../middleware/error-handler.middleware";

// Common/Services
import { initPassport } from "../services/passport-jwt.service";
import { initDB } from "../services/database.service";
import * as mailService from "../services/email.service"

// Utils
import { setCookieTokens } from "../utils/cookie.utils";

// DTO
import { type BaseSchema } from "../dto/base.dto";
import { type IUser } from "../../user/user.dto";

// Schema
import { User } from "../../user/user.schema";

// Validators
import { body } from 'express-validator';
import * as userValidator from "../../user/user.validation"

// Imports controllers
import * as userController from "../../user/user.controller";
import * as authController from "../../Auth/auth.controller";

// Imports services
import * as userService from "../../user/user.service";
import * as authService from "../../Auth/auth.service";

// Export types and other entities
export type { Express, Request, Response, NextFunction, ErrorRequestHandler, ErrorResponse, Mail };
export {
  express, Router, cookieParser, bodyParser, morgan, http, dotenv, process, path, jwt, createHttpError, createError, rateLimit, nodemailer, bcrypt, asyncHandler,
  // mongoose
  mongoose, model,
  // Swagger
  swaggerUi, swaggerJsonFile,
  // passport
  passport, Strategy, ExtractJwt, LocalStrategy,
  // Helpers
  generateAccessTokenAndRefreshToken, decodeAccessToken, decodeRefreshToken, expressAsyncHandler, validationResult, loadConfig, createResponse,
  // Middlewares
  apiLimiter, roleAuthMiddleware, catchError, errorHandler,
  // common/services
  initPassport, initDB, mailService,
  // Utils
  setCookieTokens,
  // DTO
  BaseSchema, IUser,
  // Schemas
  User,
  // Validators
  body, userValidator,
  // controllers
  userController, authController,
  // services
  userService, authService
};