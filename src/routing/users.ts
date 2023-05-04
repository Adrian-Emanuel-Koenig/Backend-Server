import { Router } from "express";
import { getUsername, logout } from "../controller/users";
import passport from "passport";
import { passSign, passLog } from "../utils/middleware/passport-config";
import { isAuth } from "../utils/middleware/auth";

export const routerUsers: Router = Router();

routerUsers.get("/api/username", isAuth, getUsername);
routerUsers.post("/api/login", passport.authenticate(passLog), getUsername);
routerUsers.post("/api/signup", passport.authenticate(passSign), getUsername);
routerUsers.get("/api/logout", logout);

