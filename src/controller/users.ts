import { Request, Response } from "express";
import { createService } from "../service/users";
import logger from "../utils/logger/winston";
import { User } from "../model/users";

const createController = async (req: Request, res: Response): Promise<void> => {
  try {
    await createService(req.body);
    res.status(201).json({
      status: true,
      message: "User successfully saved",
    });
  } catch (error: any) {
    logger.error(error, `${error}`);
  }
};

const getUsername = (req: Request, res: Response) => {
  const username = req.user as User;
  const nombre: string | undefined = username.username;
  res.json({
    status: true,
    username: nombre
  });
}

const logout = (req: Request, res: Response) => {
  const username = req.user as User;
  const nombre = username.username;
  req.session.destroy((err) => {
    if (err) {
      logger.info("Error al desloguear"+ err);
    } else {
      logger.info(nombre + " deslogueado");
    }
    res.json(nombre + " deslogueado");
  });
}


export { createController, getUsername, logout };
