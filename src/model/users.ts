import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  name: string;
  surname: string;
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true, max: 20 },
  surname: { type: String, required: true, max: 20 },
  username: { type: String, required: true, max: 30 },
  password: { type: String, required: true, max: 30 },
});

export const userModel = mongoose.model<User>("User", userSchema);