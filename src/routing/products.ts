import { Router } from "express";
import {
  readOneController,
  readAllController,
  createController,
  updateController,
  deleteController,
} from "../controller/products";

export const routerProducts: Router = Router();

routerProducts.get("/api/productos", readAllController);
routerProducts.post("/api/productos", createController);
routerProducts.get("/api/productos/:id", readOneController);
routerProducts.put("/api/productos/:id", updateController);
routerProducts.delete("/api/productos/:id", deleteController);
