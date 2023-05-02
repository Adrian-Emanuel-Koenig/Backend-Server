import { User, userModel } from "../../model/users";
import MemoryCrud from "../container/memory";
import MongoCrud from "../container/mongoDb";

import dotenv from "dotenv";
dotenv.config();

let UsersDAO: MemoryCrud | MongoCrud<User>;

const mode = process.env.DB;

if (mode == "mongo") {
  class UserDaosModel extends MongoCrud<User> {
    constructor() {
      super(userModel);
    }
  }
  UsersDAO = new UserDaosModel();
} else if (mode == "memory") {
  class UserDaosModel extends MemoryCrud {
    constructor() {
      super();
    }
  }
  UsersDAO = new UserDaosModel();
} else {
  throw new Error("No database Selected");
}

export default UsersDAO;
