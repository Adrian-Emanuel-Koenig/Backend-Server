import { User } from "../model/users";
import UsersDAO from "../persistence/dao/users";
import logger from "../utils/logger/winston";

const createService = async (data: User): Promise<void> => {
  try {
    if (
      data &&
      data.name &&
      data.surname &&
      // data.age &&
      // data.address &&
      // data.number &&
      // data.avatar &&
      data.username &&
      data.password
    ) {
      await UsersDAO.create(data);
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export { createService };
