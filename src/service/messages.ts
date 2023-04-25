import { Message } from "../model/messages";
import { Product } from "../model/products";
import MessagesDAO from "../persistence/dao/messages";
import logger from "../utils/logger/winston";

const createService = async (data: Message): Promise<void> => {
  try {
    if (data && data.username && data.message) {
      await MessagesDAO.create(data);
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// const readAllService = async (): Promise<Message[]> => {
//     try {
//       const products = await MessagesDAO.readAll();
//       return products;
//     } catch (error) {
//       logger.error(error);
//       throw error;
//     }
//   };

const readOneService = async (
  data: string
): Promise<Message | null | undefined | {}> => {
  try {
    console.log(data);
    return await MessagesDAO.chat(data);
  } catch (error) {
    logger.error(error);
  }
};
export { createService, readOneService };
