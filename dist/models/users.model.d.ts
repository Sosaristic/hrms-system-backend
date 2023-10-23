import mongoose, { Document } from "mongoose";
export interface UserType extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    emailVerified: boolean;
    refreshToken: string;
}
export declare const UserModel: mongoose.Model<UserType, {}, {}, {}, mongoose.Document<unknown, {}, UserType> & UserType & {
    _id: mongoose.Types.ObjectId;
}, any>;
