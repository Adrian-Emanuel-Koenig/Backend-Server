import { Product } from "../../model/products";

class MemoryCrud {
  private data: Product[];
  private nextId: number;

  constructor() {
    this.data = [];
    this.nextId = 1; 
  }

  create(object: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const product = { ...object, id: this.nextId.toString() };
      this.nextId++;
      this.data.push(product);
      resolve();
    });
  }

  async readAll(): Promise<Product[] | any> {
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
    }
    return object;
  }

  update(id: string, newObject: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = this.data.findIndex((obj) => obj.id === id);
      if (index === -1) reject(new Error("Object not found"));
      const oldObject = this.data[index];
      const updatedObject: any = { ...oldObject, ...newObject, id };
      this.data.splice(index, 1, updatedObject);
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

  readUsername(data: any) {
    console.log(data);
  }
}

export default MemoryCrud;
