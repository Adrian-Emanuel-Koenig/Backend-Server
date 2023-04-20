import { Request, Response } from "express";
import { createService } from "../service/users";
import logger from "../utils/logger/winston";

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

export { createController };
