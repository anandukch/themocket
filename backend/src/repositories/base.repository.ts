import { ClientSession, Model } from "mongoose";

export default class BaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async create(data: T, session?: ClientSession): Promise<T> {
    const createdDocument = await this.model.create([data], { session });
    return createdDocument[0];
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findBy(filter: Partial<T>): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async findOneBy(filter: Partial<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async findOneById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async update(id: string, updateData: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, updateData).exec();
  }
}
