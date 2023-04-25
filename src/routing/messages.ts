import { Router } from "express";
import {createController, readOneController} from "../controller/messages";

export const routerMessages: Router = Router();

routerMessages.get("/api/messages/:username", readOneController);
routerMessages.post("/api/messages", createController);

