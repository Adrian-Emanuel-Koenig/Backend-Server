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
    console.log(data);
    return await MessagesDAO.readUsername(data);
  } catch (error) {
    logger.error(error);
  }
};
export { createService, readOneService };
