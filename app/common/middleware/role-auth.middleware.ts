import { NextFunction, Request, Response, IUser, expressAsyncHandler, createHttpError, decodeAccessToken } from "../helper/imports.helper";

// Middleware for role-based authentication
// export const roleAuthMiddleware = expressAsyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
    
//     const token = req.headers.authorization?.replace("Bearer ", "");
    
//     if (!token) {
//       throw createHttpError(401, {
//         message: "Token is required for authentication",
//       });
//     }

//     const user = await decodeAccessToken(token) as IUser;
    
//     // Check if user has a valid role
//     if (!user.role || !['ADMIN', 'USER'].includes(user.role)) {
//       throw createHttpError(403, {
//         message: "Invalid or unauthorized user role",
//       });
//     }

//     req.user = user as IUser;
//     next();
//   }
// );

export const roleAuthMiddleware = (roles: IUser["role"][], publicRoutes: string[] = []) =>
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (publicRoutes.includes(req.path)) {
        next();
        return;
      }
      
      const token = req.headers.authorization?.replace("Bearer ", "") || req.cookies?.accessToken;
      
      if (!token) {
        throw createHttpError(401, {
          message: "Token is required for authentication",
        });
      }
      const decodedUser = await decodeAccessToken(token) as IUser;

      // Check if user has a valid role
      if (!decodedUser.role || !['ADMIN', 'USER'].includes(decodedUser.role)) {
        throw createHttpError(403, {
          message: "Invalid or unauthorized user role",
        });
      }
      
      if (!roles.includes(decodedUser.role)) {
        const type =
        decodedUser.role.slice(0, 1) + decodedUser.role.slice(1).toLocaleLowerCase();
        
        throw createHttpError(401, {
          message: `${type} can not access this resource`,
        });
      }

      req.user = decodedUser as IUser;
      next();
    }
  );