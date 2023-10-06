import mongoose, { Document, Schema } from "mongoose";
import { User } from "./users.model";

export interface Token extends Document {
  userId: User["_id"];
  token: string;
  createdAt: Date;
}

const tokenSchema: Schema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    token: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 3600,
    }    
})



export const TokenModel = mongoose.model<Token>("Token", tokenSchema);
