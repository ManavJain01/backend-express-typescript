
import * as authService from "./auth.service";
import { createResponse } from "../../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'
import createHttpError from "http-errors";

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.loginUser(req.body);
    res.send(createResponse(result, "User login successfully"))
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    if(!req.user){
        throw createHttpError(403, {
            message: "Invalid or unauthorized user role",
        });
    }

    await authService.logoutUser(req.user._id);
    res.send(createResponse("User logout successfully"))
});

export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const token = req.headers.authorization?.replace("Bearer ", "") || req.cookies.refreshToken;

    const result = await authService.refreshAccessToken(token as string);
    res.send(createResponse(result, "Refresh Token created successfully"))
});