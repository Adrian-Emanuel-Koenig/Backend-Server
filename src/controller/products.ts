import { Request, Response } from "express";
import {
  createService,
  readOneService,
  readAllService,
  updateService,
  deleteService,
} from "../service/products";
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
    const product = await readOneService(req.body);
    res.json({
      status: true,
      data: product,
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
    const products = await readAllService();
    res.json({
      status: true,
      data: products,
    });
  } catch (error: any) {
    logger.error(error, `${error}`);
  }
};

const updateController = async (req: Request, res: Response): Promise<void> => {
  try {
    await updateService(req.params.id, req.body);
    res.json({
      status: true,
      message: "Product successfully updated",
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
      message: "Product successfully deleted",
    });
  } catch (error: any) {
    logger.error(error, `${error}`);
  }
};

export {
  createController,
  readOneController,
  readAllController,
  updateController,
  deleteController,
};
