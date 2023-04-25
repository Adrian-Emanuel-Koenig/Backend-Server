import { Cart, cartModel } from "../../model/cart";
import MemoryCrud from "../container/memory";
import MongoCrud from "../container/mongoDb";

import dotenv from "dotenv";
dotenv.config();

let CartDAO: MemoryCrud | MongoCrud<Cart>;

const mode = process.env.DB;

if (mode == "mongo") {
  console.log("DB: mongo");
  class UserDaosModel extends MongoCrud<Cart> {
    constructor() {
      super(cartModel);
    }
  }
  CartDAO = new UserDaosModel();
} else if (mode == "memory") {
  console.log("DB: memory");
  class UserDaosModel extends MemoryCrud {
    constructor() {
      super();
    }
  }
  CartDAO = new UserDaosModel();
} else {
  throw new Error("No database Selected");
}

export default CartDAO;
