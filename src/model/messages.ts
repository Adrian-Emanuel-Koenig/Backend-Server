import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  username: string;
  message: string;
  date: Date;
}

const messageSchema = new Schema<Message>({
  username: { type: String, required: true, max: 30 },
  message: { type: String, required: true, max: 400 },
  date: { type: Date, default: Date.now }
});

export const messageModel = mongoose.model<Message>("Message", messageSchema);
