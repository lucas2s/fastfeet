import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryController from './app/controllers/DeliveryController';
import FileController from './app/controllers/FileController';
import DeliveryDeliveryManController from './app/controllers/DeliveryDeliveryManController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import DeliveryDeliveryProblemController from './app/controllers/DeliveryDeliveryProblemController';

const routes = new Router();
const upload = multer(multerConfig);

// ---------------------------------------------------------------------------------
// Rotas com o ID do deliveryman e sessão
// ---------------------------------------------------------------------------------

routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/:id/delivery', DeliveryDeliveryManController.index);

routes.put(
  '/deliveryman-start/:id/delivery/:deliveryid',
  DeliveryDeliveryManController.updateStart
);

routes.put(
  '/deliveryman-end/:id/delivery/:deliveryid',
  DeliveryDeliveryManController.updateEnd
);

routes.post(
  '/deliveryman/:id/delivery/:deliveryid/problems',
  DeliveryProblemController.store
);

routes.get('/deliveryman/:id', DeliveryManController.indexById);

routes.get(
  '/deliveryproblems/:id',
  DeliveryDeliveryProblemController.indexByIdProblem
);

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/', (req, res) => res.send('ok'));

// ---------------------------------------------------------------------------------
// Rotas com autenticação de Token
// ---------------------------------------------------------------------------------

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);
routes.get('/recipients/:id', RecipientController.indexById);
routes.get('/recipients', RecipientController.index);

routes.post('/deliveryman', DeliveryManController.store);
routes.put('/deliveryman/:id', DeliveryManController.update);
routes.delete('/deliveryman/:id', DeliveryManController.delete);
routes.get('/deliveryman', DeliveryManController.index);

routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);
routes.get('/deliveries/:id', DeliveryController.indexById);
routes.get('/deliveries', DeliveryController.index);

routes.get(
  '/problems/deliveries',
  DeliveryDeliveryProblemController.indexProblem
);

export default routes;
