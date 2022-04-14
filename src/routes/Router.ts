import { Router } from 'express';
import GenericController from '../controllers/GenericController';
import updateValidate from '../middleware/validacoes';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: GenericController<T>,
    route: string = controller.route,
  ) {
    this.router.post(route, controller.create);
    this.router.get(route, controller.read);
    this.router.get(`${route}/:id`, controller.readOne);
    this.router.put(`${route}/:id`, updateValidate, controller.update);
  }
}

export default CustomRouter;