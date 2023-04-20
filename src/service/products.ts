import { Product } from "../model/products";
import ProductsDAO from "../persistence/dao/products";
import logger from "../utils/logger/winston";

const createService = async (data: Product): Promise<void> => {
  try {
    if (
      data &&
      data.nombre &&
      data.precio &&
      data.stock &&
      data.img &&
      data.categoria
    ) {
      await ProductsDAO.create(data);
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const readOneService = async (
  data: string
): Promise<Product | null | undefined> => {
  try {
    return await ProductsDAO.read(data);
  } catch (error) {
    logger.error(error);
  }
};

const readAllService = async (): Promise<Product[]> => {
  try {
    const products = await ProductsDAO.readAll();
    return products;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const updateService = async (id: string, data: any): Promise<void> => {
  try {
    await ProductsDAO.update(id, data);
  } catch (error) {
    logger.error(error);
  }
};

const deleteService = async (id: string): Promise<void> => {
  try {
    await ProductsDAO.delete(id);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export {
  createService,
  readOneService,
  readAllService,
  updateService,
  deleteService,
};
