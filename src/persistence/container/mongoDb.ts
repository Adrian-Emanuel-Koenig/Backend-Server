import { Model, Document } from "mongoose";

class MongoCrud<T extends Document> {
  constructor(private model: Model<T>) {}

  async create(data: T): Promise<T> {
    try {
      const item = await this.model.create(data);
      console.log(item);
      return item;
    } catch (error) {
      throw new Error(`Error creating item: ${error}`);
    }
  }

  async read(username: string): Promise<T | null> {
    const item = await this.model.findOne({ username });
    if (!item) {
      console.log(item);
      return null;
    }
    return item;
  }

  async readUsername(username: string): Promise<T | null| {}> {
    const item = await this.model.find({ username });
    if (!item) {
      return null;
    }
    return item;
  }

  async readAll(): Promise<T[]> {
    const items = await this.model.find({});
    return items;
  }

  async update(id: string, data: any): Promise<T> {
    try {
      const item = await this.model.findByIdAndUpdate(id, data, { new: true });
      if (!item) {
        throw new Error(`Item not found`);
      }
      return item;
    } catch (error) {
      throw new Error(`Error updating item: ${error}`);
    }
  }

  async delete(id: string): Promise<T> {
    try {
      const item = await this.model.findByIdAndDelete(id);
      if (!item) {
        throw new Error(`Item not found`);
      }
      return item;
    } catch (error) {
      throw new Error(`Error deleting item: ${error}`);
    }
  }
}

export default MongoCrud;
