import { IUser, bcrypt, mongoose, model, authService } from "../common/helper/imports.helper";

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>({
        name: { type: String, required: true },
        email: { type: String, required: true },
        role: { type: String, required: true, enum: ["USER", "ADMIN"], default: "USER" },
        password: { type: String, required: true },
        refreshToken: {
                type: String,
                default: null, // Ensure it can be null if it's removed
        },
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
        if (this.password) {
                this.password = await authService.hashPassword(this.password);
        }
        next();
});


// Exporting models
const User = model<IUser>("User", UserSchema);

export { User };
