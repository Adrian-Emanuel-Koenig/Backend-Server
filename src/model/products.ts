import mongoose, { Schema, Document } from "mongoose";

export interface Product extends Document {
  nombre: string;
  precio: number;
  stock: number;
  categoria: string
  img: string;
}

const productosSchema = new Schema<Product>({
  nombre: { type: String, required: true, max: 100 },
  precio: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  categoria: { type: String, required: true, max: 50 },
  img: { type: String, required: true },
});

export const productModel = mongoose.model<Product>("Product", productosSchema);
