// import { ZodError } from 'zod';
import { Response } from 'express';
import GenericController,
{ RequestWithBody, ResponseError } from './GenericController';
import CarService from '../services/CarService';
import { Car as ICar } from '../interfaces/CarInterface';

class CarController extends GenericController<ICar> {
  private _route: string;

  constructor(
    protected service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<ICar>,
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { body } = req;
      const car = await this.service.create(body);
      if (!car) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in car) {
        return res.status(400).json({ error: car.error.issues[0].message });
      }
      return res.status(201).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;

// https://dev.to/franciscomendes10866/schema-validation-with-zod-and-expressjs-111p

// https://github.com/colinhacks/zod/blob/master/ERROR_HANDLING.md

// https://www.npmjs.com/package/@expresso/router

// https://www.linkedin.com/posts/diego-victor-gonzaga_zod-typescript-joi-activity-6864723149146128384-nDwv/

// https://www.npmjs.com/package/zod

// https://github.com/colinhacks/zod#defining-schemas