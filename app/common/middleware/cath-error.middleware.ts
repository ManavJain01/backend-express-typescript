import { Response, Request, NextFunction, createHttpError, expressAsyncHandler, validationResult } from "../helper/imports.helper"

export const catchError = expressAsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const isError = errors.isEmpty();
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!isError) {
      const data = { errors: errors.array() };
      throw createHttpError(400, {
        message: "Validation error!",
        data,
      });
    } else {
      next();
    }
  }
);
