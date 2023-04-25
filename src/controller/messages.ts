import { Request, Response } from "express";
import { createService, readOneService } from "../service/messages";
import logger from "../utils/logger/winston";

const createController = async (req: Request, res: Response): Promise<void> => {
  try {
    await createService(req.body);
    res.status(201).json({
      status: true,
      message: "Product successfully saved",
    });
  } catch (error: any) {
    logger.error(error, `${error}`);
  }
};

const readOneController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username } = req.params;
    const message = await readOneService(username);
    res.json(message);
  } catch (error: any) {
    logger.error(error, `${error}`);
  }
};


export { createController, readOneController };
