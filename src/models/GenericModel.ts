import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface'; 

// abstract class GenericModel<T> implements Model<T> {
class GenericModel<T> implements Model<T> {
  constructor(public model: M<T & Document>) {}

  public create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  public read = async (): Promise<T[]> => this.model.find();

  public readOne = async (id: string): Promise<T | null> => 
    this.model.findById({ _id: id });

  public update = async (id: string, obj: object): Promise<T | null> => 
    this.model.findByIdAndUpdate({ _id: id }, obj);

  public delete = async (id: string): Promise<T | null> => 
    this.model.findByIdAndDelete({ _id: id });
}

export default GenericModel;