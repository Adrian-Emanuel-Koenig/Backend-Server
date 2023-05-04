import { Router } from "express";
import {createController, readOneController, readAllController} from "../controller/messages";

export const routerMessages: Router = Router();

routerMessages.get("/api/messages/", readAllController);
routerMessages.get("/api/messages/:username", readOneController);
routerMessages.post("/api/messages", createController);

