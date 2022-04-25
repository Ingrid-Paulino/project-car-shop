// import { Request, Response } from 'express';
// import GenericController, { RequestWithBody, ResponseError } from './GenericController';
import GenericController from './GenericController';

import MotorcycleService from '../services/MotorcyclesService';
import { Motorcycle as IMotorcycle } from '../interfaces/MotorcycleInterface';

class MotorcycleController extends GenericController<IMotorcycle> {
  // private _route: string;

  constructor(
    public service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service, route);
    // this._route = route;
  }

  // get route() { return this._route; }

  // create = async (
  //   req: RequestWithBody<IMotorcycle>,
  //   res: Response<IMotorcycle | ResponseError>,
  // ): Promise<typeof res> => {
  //   try {
  //     const { body } = req;
  //     const motorcycle = await this.service.create(body);
  //     if (!motorcycle) {
  //       return res.status(500).json({ error: this.errors.internal });
  //     }
  //     if ('error' in motorcycle) {
  //       return res.status(400)
  //         .json({ error: motorcycle.error.issues[0].message });
  //     }
  //     return res.status(201).json(motorcycle);
  //   } catch (err) {
  //     return res.status(500).json({ error: this.errors.internal });
  //   }
  // };

  // readOne = async (
  //   req: Request<{ id: string }>,
  //   res: Response<IMotorcycle | ResponseError>,
  // ): Promise<typeof res> => {
  //   const { id } = req.params;
  //   if (id.length < 24) {
  //     return res.status(400)
  //       .json({ error: 'Id must have 24 hexadecimal characters' });
  //   } 
  //   try {
  //     const motorcycle = await this.service.readOne(id);
  //     return motorcycle 
  //       ? res.json(motorcycle)
  //       : res.status(404).json({ error: this.errors.notFound });
  //   } catch (error) {
  //     return res.status(500).json({ error: this.errors.internal });
  //   }
  // };

  // public update = async (
  //   req: Request<{ id: string }>,
  //   res: Response<IMotorcycle | ResponseError>,
  // ): Promise<typeof res> => {
  //   try {
  //     const motorcycle = await this.service.update(req.params.id, req.body);

  //     if (!motorcycle) {
  //       return res.status(404).json({ error: this.errors.notFound });
  //     }
      
  //     if ('error' in motorcycle) {
  //       return res.status(400)
  //         .json({ error: motorcycle.error.issues[0].message });
  //     }
  
  //     return res.status(200).json(motorcycle);
  //   } catch (error) {
  //     console.log('error', error);
      
  //     return res.status(500).json({ error: this.errors.internal });
  //   }
  // };
}

export default MotorcycleController;