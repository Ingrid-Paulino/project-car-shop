// import { ZodError } from 'zod';
// import { Request, Response } from 'express';
// import GenericController, { RequestWithBody, ResponseError } from './GenericController';
import GenericController from './GenericController';
import CarService from '../services/CarService';
import { Car as ICar } from '../interfaces/CarInterface';

class CarController extends GenericController<ICar> {
  // private _route: string;

  constructor(
    public service = new CarService(),
    route = '/cars',
  ) {
    super(service, route);
    // this._route = route;
  }

  // get route() { return this._route; }

  // create = async (
  //   req: RequestWithBody<ICar>,
  //   res: Response<ICar | ResponseError>,
  // ): Promise<typeof res> => {
  //   try {
  //     const { body } = req;
  //     const car = await this.service.create(body);
  //     if (!car) {
  //       return res.status(500).json({ error: this.errors.internal });
  //     }
  //     if ('error' in car) {
  //       return res.status(400).json({ error: car.error.issues[0].message });
  //     }
  //     return res.status(201).json(car);
  //   } catch (err) {
  //     return res.status(500).json({ error: this.errors.internal });
  //   }
  // };

  // readOne = async (
  //   req: Request<{ id: string }>,
  //   res: Response<ICar | ResponseError>,
  // ): Promise<typeof res> => {
  //   const { id } = req.params;
  //   if (id.length < 24) {
  //     return res.status(400)
  //       .json({ error: 'Id must have 24 hexadecimal characters' });
  //   } 
  //   try {
  //     const car = await this.service.readOne(id);
  //     return car 
  //       ? res.json(car)
  //       : res.status(404).json({ error: this.errors.notFound });
  //   } catch (error) {
  //     return res.status(500).json({ error: this.errors.internal });
  //   }
  // };

  // public update = async (
  //   req: Request<{ id: string }>,
  //   res: Response<ICar | ResponseError>,
  // ): Promise<typeof res> => {
  //   // console.log('aaaaa', req);
  //   // console.log('bbbbbbbb', res);
  //   try {
  //     const car = await this.service.update(req.params.id, req.body);

  //     if (!car) {
  //       return res.status(404).json({ error: this.errors.notFound });
  //     }
      
  //     if ('error' in car) {
  //       return res.status(400).json({ error: car.error.issues[0].message });
  //     }
  
  //     return res.status(200).json(car);
  //   } catch (error) {
  //     console.log('error', error);
      
  //     return res.status(500).json({ error: this.errors.internal });
  //   }
  // };
}

export default CarController;

// https://dev.to/franciscomendes10866/schema-validation-with-zod-and-expressjs-111p

// https://github.com/colinhacks/zod/blob/master/ERROR_HANDLING.md

// https://www.npmjs.com/package/@expresso/router

// https://www.linkedin.com/posts/diego-victor-gonzaga_zod-typescript-joi-activity-6864723149146128384-nDwv/

// https://www.npmjs.com/package/zod

// https://github.com/colinhacks/zod#defining-schemas