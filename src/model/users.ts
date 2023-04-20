import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  name: string;
  surname: string;
  // age: number;
  // address: string;
  // number: number;
  // avatar: string;
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true, max: 20 },
  surname: { type: String, required: true, max: 20 },
  // age: { type: Number, required: true, min: 0, max: 100 },
  // address: { type: String, required: true, max: 100 },
  // number: { type: Number, required: true, min: 0 },
  // avatar: { type: String, required: true },
  username: { type: String, required: true, max: 30 },
  password: { type: String, required: true, max: 30 },
});

export const userModel = mongoose.model<User>("User", userSchema);