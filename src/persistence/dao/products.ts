import { Product, productModel } from "../../model/products";
import logger from "../../utils/logger/winston";
import MemoryCrud from "../container/memory";
import MongoCrud from "../container/mongoDb";

import dotenv from "dotenv";
dotenv.config();

let ProductsDAO: MemoryCrud | MongoCrud<Product>;

const mode = process.env.DB;

if (mode === "mongo") {
  logger.info("DB: mongo");
  class ProdDaosModel extends MongoCrud<Product> {
    constructor() {
      super(productModel);
    }
  }
  ProductsDAO = new ProdDaosModel();
} else if (mode === "memory") {
  logger.info("DB: memory");
  class ProdDaosModel extends MemoryCrud {
    constructor() {
      super();
    }
  }
  ProductsDAO = new ProdDaosModel();
} else {
  throw new Error("No database selected");
}

export default ProductsDAO;
