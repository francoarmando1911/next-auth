import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
    _id?: mongoose.Types.ObjectId | string;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IUserSchema extends Document<mongoose.Types.ObjectId> {
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
