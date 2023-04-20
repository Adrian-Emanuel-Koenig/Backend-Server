import { Message, messageModel } from "../../model/messages";
import MemoryCrud from "../container/memory";
import MongoCrud from "../container/mongoDb";

import dotenv from "dotenv";
dotenv.config();

let MessagesDAO: MemoryCrud | MongoCrud<Message>;

const mode = process.env.DB;

if (mode == "mongo") {
  console.log("DB: mongo");
  class UserDaosModel extends MongoCrud<Message> {
    constructor() {
      super(messageModel);
    }
  }
  MessagesDAO = new UserDaosModel();
} else if (mode == "memory") {
  console.log("DB: memory");
  class UserDaosModel extends MemoryCrud {
    constructor() {
      super();
    }
  }
  MessagesDAO = new UserDaosModel();
} else {
  throw new Error("No database Selected");
}

export default MessagesDAO;
