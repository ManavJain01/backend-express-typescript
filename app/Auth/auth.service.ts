import { User, IUser, createHttpError, decodeRefreshToken, generateAccessTokenAndRefreshToken, bcrypt, authService, mailService,  } from "../common/helper/imports.helper";

export const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 12);
    return hash;
};

export const isCorrectPassword = async (dbPassword: string, incomingPassword: string) => {
    console.log("dbPassword: ", dbPassword);
    console.log("incomingPassword: ", incomingPassword);

    const query = await bcrypt.compare(incomingPassword, dbPassword);
    // const query = incomingPassword === dbPassword;

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

    // Remove the refreshToken from the user document
    fetchUser.refreshToken = undefined;

    await fetchUser.save();

    return;
};

export const forgotPassword = async (email: string) => {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw createHttpError(403, {
            message: "Invalid or unauthorized user role",
        });
    }

    // Generate a password reset token
    const { accessToken } = await generateAccessTokenAndRefreshToken(user);

    // Create a reset URL
    const resetURL = `${process.env.FE_BASE_URL}/reset-password?token=${accessToken}`;

    // Send the reset email
    const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    text: `You requested a password reset. Click the link to reset your password: ${resetURL}`,
    };

    await mailService.sendEmail(mailOptions);
}

export const resetPassword = async (decodedUser: IUser, newPassword: string) => {
    // Find the user by decoded userId
    const user = await User.findById(decodedUser._id);
    if (!user) {
        throw createHttpError(403, {
            message: "Invalid or unauthorized user role",
        });
    }
    
    // Hash the new password
    const hashedPassword = await authService.hashPassword(newPassword);
    
    // Update the user's password
    user.password = hashedPassword;
    await user.save();

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