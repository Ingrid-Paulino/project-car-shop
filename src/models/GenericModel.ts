import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface'; 

abstract class GenericModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) {}

  public create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  public read = async (): Promise<T[]> => this.model.find();

  public readOne = async (id: string): Promise<T | null> => 
    this.model.findById({ _id: id });

  public update = async (id: string): Promise<T | null> => 
    this.model.findByIdAndUpdate({ _id: id });

  public delete = async (id: string): Promise<T | null> => 
    this.model.findByIdAndRemove({ _id: id });
}

export default GenericModel;