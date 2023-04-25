import { Router } from "express";
import {
  createController,
  readOneController,
  updateController,
  deleteController,
  readAllController
} from "../controller/cart";

export const routerCart: Router = Router();

routerCart.post("/api/cart", createController);
routerCart.get("/api/cart", readAllController);
routerCart.get("/api/cart/:username", readOneController);
routerCart.put("/api/cart/:id", updateController);
routerCart.delete("/api/cart/:id", deleteController);
