import mongoose, { Schema, Document } from "mongoose";

export interface CartItem {
  _id: any;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}

export interface Cart extends Document {
  username: string;
  cart: CartItem[];
  date: Date;
}

const cartSchema = new Schema<Cart>({
  username: { type: String, required: true, max: 30 },
  cart: {
    type: [
      {
        _id: String,
        nombre: String,
        precio: Number,
        stock: Number,
        categoria: String,
      },
    ],
    required: true,
  },
  date: { type: Date, default: Date.now },
});

export const cartModel = mongoose.model<Cart>("Cart", cartSchema);
