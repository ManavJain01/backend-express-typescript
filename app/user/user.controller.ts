import { userService, createResponse, asyncHandler, Request, Response, setCookieTokens } from "../common/helper/imports.helper";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body);

    // Set Cookies
    const { accessToken, refreshToken } = result;
    setCookieTokens(req, res, accessToken, refreshToken);

    res.send(createResponse(result, "User created successfully"))
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.updateUser(req.params.id, req.body);
    res.send(createResponse(result, "User updated successfully"))
});

export const editUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.editUser(req.params.id, req.body);
    res.send(createResponse(result, "User updated successfully"))
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.deleteUser(req.params.id);
    res.send(createResponse(result, "User deleted successfully"))
});


export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getUserById(req.params.id);
    res.send(createResponse(result))
});


export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getAllUser();
    res.send(createResponse(result))
});
