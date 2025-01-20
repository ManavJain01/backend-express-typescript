import { authService, createResponse, createHttpError, asyncHandler, Request, Response, setCookieTokens, decodeAccessToken, IUser } from "../common/helper/imports.helper";

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.loginUser(req.body);

    // Set Cookies
    const { accessToken, refreshToken } = result;
    setCookieTokens(req, res, accessToken, refreshToken);

    res.send(createResponse(result, "User login successfully"))
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    if(!req.user){
        throw createHttpError(403, {
            message: "Invalid or unauthorized user role",
        });
    }

    await authService.logoutUser(req.user._id);
    
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.send(createResponse("User logout successfully"))
});


export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    await authService.forgotPassword(email);

    res.send(createResponse("Password reset link sent to your email" ));
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.params;  // Get token from URL params
    const { newPassword } = req.body;  // Get the new password from request body  
  
    // Verify the token
    const decodedUser = await decodeAccessToken(token) as IUser;

    await authService.resetPassword(decodedUser, newPassword);

    res.send(createResponse("Password successfully reset" ));
});

export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const token = req.headers.authorization?.replace("Bearer ", "") || req.cookies.refreshToken;

    const result = await authService.refreshAccessToken(token as string);
    
    // Set Cookies
    const { accessToken, refreshToken } = result;
    setCookieTokens(req, res, accessToken, refreshToken);

    res.send(createResponse(result, "Refresh Token created successfully"))
});