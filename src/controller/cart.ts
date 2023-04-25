import { Request, Response } from "express";
import {
  createService,
  readOneService,
  readAllService,
  updateService,
  deleteService,
} from "../service/cart";
import logger from "../utils/logger/winston";

const createController = async (req: Request, res: Response): Promise<void> => {
  try {
    await createService(req.body);
    res.status(201).json({
      status: true,
      message: "Cart successfully saved",
    });
  } catch (error: any) {
    logger.error(error, `${error}`);
  }
};

const readAllController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Entre en read all")
    const products = await readAllService();
    res.json({
      status: true,
      data: products,
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

const updateController = async (req: Request, res: Response): Promise<void> => {
  try {
    await updateService(req.params.id, req.body);
    res.json({
      status: true,
      message: "Cart successfully updated",
    });
  } catch (error: any) {
    logger.error(error, `${error}`);
  }
};

const deleteController = async (req: Request, res: Response): Promise<void> => {
  try {
    await deleteService(req.params.id);
    res.json({
      status: true,
      message: "Cart successfully deleted",
    });
  } catch (error: any) {
    logger.error(error, `${error}`);
  }
};

export {
  createController,
  readOneController,
  updateController,
  readAllController,
  deleteController,
};
