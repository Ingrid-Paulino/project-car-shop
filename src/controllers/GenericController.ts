import { Request, Response } from 'express';
import GenericService from '../services/GenericServices';
import ControllerErrors from '../enum';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

abstract class GenericController<T> {
  abstract route: string;

  protected errors = ControllerErrors;
  
  constructor(protected service: GenericService<T>) {}

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError >,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read();
      return res.json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  // abstract readOne(
  //   req: Request<{ id: string; }>,
  //   res: Response<T | ResponseError>
  // ): Promise<typeof res>;
}
export default GenericController;
