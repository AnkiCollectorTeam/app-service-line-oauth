import { Schema, model } from 'mongoose';
import Config from "../config/index";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    id: { type: 'string', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String
});

// 3. Create a Model.
export const userProfile = model<IUser>('User', userSchema, Config.db.collection);

