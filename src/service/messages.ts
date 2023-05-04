import { Message } from "../model/messages";
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

const readOneService = async (
  data: string
): Promise<Message | null | undefined | {}> => {
  try {
    return await MessagesDAO.readUsername(data);
  } catch (error) {
    logger.error(error);
  }
};

const readAllService = async (): Promise<Message[]> => {
  try {
    const message = await MessagesDAO.readAll();
    return message;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
export { createService, readOneService, readAllService };
