import { BaseSchema } from "../common/helper/imports.helper";

export interface IUser extends BaseSchema {
        name: string;
        email: string;
        role: "USER" | "ADMIN";
        password: string,
        refreshToken: string | undefined
}