import { Product } from "../../model/products";

class MemoryCrud {
  private data: Product[];

  constructor() {
    this.data = [];
  }

  create(object: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.data.push(object);
      console.log(object);
      resolve();
    });
  }

  async readAll(): Promise<Product[]> {
    try {
      const objects = this.data;
      return objects;
    } catch (error) {
      throw new Error(`Error reading objects: ${error}`);
    }
  }

  read(id: string): Product | undefined {
    const object = this.data.find((obj) => obj.id == id);
    if (!object) {
      console.log("Product not found");
    }
    return object;
  }

  update(id: string, newObject: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = this.data.findIndex((obj) => obj.id === id);
      if (index === -1) reject(new Error("Object not found"));
      this.data.splice(index, 1, newObject);
      resolve();
    });
  }

  delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = this.data.findIndex((obj) => obj.id === id);
      if (index === -1) reject(new Error("Object not found"));
      this.data.splice(index, 1);
      resolve();
    });
  }
}

export default MemoryCrud;
