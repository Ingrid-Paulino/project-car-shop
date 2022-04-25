import CustomRouter from './routes/Router';
import App from './app';
import { Car } from './interfaces/CarInterface';
import { Motorcycle as IMotorcycle } from './interfaces/MotorcycleInterface';
import CarController from './controllers/CarController';
import MotorcycleController from './controllers/MotorcycleController';

const server = new App();

const carController = new CarController();
const motorcycleController = new MotorcycleController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

const MotorcycleRouter = new CustomRouter<IMotorcycle>();
MotorcycleRouter.addRoute(motorcycleController);

server.addRouter(carRouter.router);
server.addRouter(MotorcycleRouter.router);

export default server;
