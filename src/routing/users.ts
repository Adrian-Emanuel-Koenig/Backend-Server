import { Router } from "express";
import { createController } from "../controller/users";
import passport from "passport";
import { passSign, passLog } from "../utils/middleware/passport-config";
import { User } from "../model/users";
import { isAuth } from "../utils/middleware/auth";

export const routerUsers: Router = Router();

routerUsers.get("/api/username", isAuth, (req, res) => {
  const username = req.user as User;
  const nombre: string | undefined = username.username;
  console.log(nombre);
  res.json({
    status: true,
    username: nombre
  });
});

routerUsers.post("/api/login", passport.authenticate(passLog), (req, res) => {
  const username = req.user as User;
  const nombre = username.username;
  console.log(nombre);
  res.json({ nombre });
});

routerUsers.post("/api/signup", passport.authenticate(passSign), (req, res) => {
  res.json("Hello");
});

routerUsers.get("/api/logout", (req, res) => {
  const username = req.user as User;
  const nombre = username.username;
  req.session.destroy((err) => {
    if (err) {
      console.log("Error al desloguear");
    } else {
      console.log(nombre + " deslogueado");
    }
    res.json(nombre + " deslogueado");
  });
});

routerUsers.put("/api/users/:id");
routerUsers.delete("/api/users/:id");
