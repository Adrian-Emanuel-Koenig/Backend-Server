import { Cart } from "../model/cart";
import CartDAO from "../persistence/dao/cart";
import logger from "../utils/logger/winston";

const createService = async (data: Cart): Promise<void> => {
  try {
    if (
      data &&
      data.username&&
      data.cart 
    ) {
      await CartDAO.create(data);
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const readAllService = async (): Promise<Cart[]> => {
  try {
    const carro = await CartDAO.readAll();
    return carro;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const readOneService = async (
    data: string
  ): Promise<Cart | null | undefined | {}> => {
    try {
      return await CartDAO.readUsername(data);
    } catch (error) {
      logger.error(error);
    }
  };

const updateService = async (id: string, data: any): Promise<void> => {
  try {
    await CartDAO.update(id, data);
  } catch (error) {
    logger.error(error);
  }
};

const deleteService = async (id: string): Promise<void> => {
  try {
    await CartDAO.delete(id);
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
