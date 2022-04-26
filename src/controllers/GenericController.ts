import { Request, Response } from 'express';
import GenericService from '../services/GenericServices';
// import ControllerErrors from '../enum';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

class GenericController<T> {
  // route: string;

  protected errors = ControllerErrors;
  
  constructor(
    public service: GenericService<T>,
    public route: string, 
  ) {}

  get getRoute() { return this.route; }

  // abstract create(
  //   req: RequestWithBody<T>,
  //   res: Response<T | ResponseError >,
  // ): Promise<typeof res>;

  create = async (
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { body } = req;
      const objs = await this.service.create(body);
      if (!objs) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in objs) {
        return res.status(400)
          .json({ error: objs.error.issues[0].message });
      }
      return res.status(201).json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      // console.log('obj');

      const objs = await this.service.read();
      
      return res.status(200).json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  // abstract readOne(
  //   req: Request<{ id: string; }>,
  //   res: Response<T | ResponseError>
  // ): Promise<typeof res>;

  readOne = async (
    req: Request,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    if (id.length < 24) {
      return res.status(400)
        .json({ error: 'Id must have 24 hexadecimal characters' });
    } 
    try {
      const obj = await this.service.readOne(id);
      return obj 
        ? res.json(obj)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  // abstract update(
  //   req: RequestWithBody<T>,
  //   res: Response<T | ResponseError>,
  // ): Promise<typeof res>;

  public update = async (
    req: Request,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const obj = await this.service.update(req.params.id, req.body);

      if (!obj) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      
      if ('error' in obj) {
        return res.status(400).json({ error: obj.error.issues[0].message });
      }
  
      return res.status(200).json(obj);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    if (id.length < 24) {
      return res.status(400)
        .json({ error: 'Id must have 24 hexadecimal characters' });
    } 
    try {
      const obj = await this.service.delete(id);
      return obj 
        ? res.status(204).json(obj)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}
export default GenericController;
