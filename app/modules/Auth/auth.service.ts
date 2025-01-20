import createHttpError from "http-errors";
import { decodeRefreshToken, generateAccessTokenAndRefreshToken } from "../../common/helper/jwt.helper";
import { User } from "../user/user.schema";
import { IUser } from "../user/user.dto";


export const isCorrectPassword = async (dbPassword: string, incomingPassword: string) => {
    console.log("dbPassword: ", dbPassword);
    console.log("incomingPassword: ", incomingPassword);

    // const query = await bcrypt.compare(incomingPassword, dbPassword);
    const query = incomingPassword === dbPassword;

    if(query) return true;
    else return false;
}

export const loginUser = async (data: IUser) => {
    const { email, password } = data;
    const user = await User.findOneAndUpdate({ email }, { isActive: true });
    
    if (!user) {
        throw new Error("User not found");
    }
    
    
    // Checking input password is correct or not...
    if(!await isCorrectPassword(user.password, password)){
        throw new Error("Invalid credentials");
    }
    
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user);

    return { user: user, accessToken, refreshToken };
};

export const logoutUser = async (userId:string) => {
    const fetchUser = await User.findById(userId);

    if (!fetchUser) {
        throw new Error("User not found");
    }

    await fetchUser.save();

    return;
};


export const refreshAccessToken = async (token :string) => {
    const userCredentials = await decodeRefreshToken(token);
    const user = await User.findById(userCredentials._id);

    if(!user){
        throw new Error("No User Found");
    }

    if(user.refreshToken === token){
        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user);
    
        user.refreshToken = refreshToken;
    
        await user.save();
        
        return { user: user, accessToken, refreshToken };
    }else{
        throw createHttpError(403, {
            message: "Invalid Token",
        });
    }
};