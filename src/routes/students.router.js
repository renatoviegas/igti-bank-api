import express from 'express';
import controller from '../controllers/students.controller.js';

const router = express.Router();

router.route('/')
  .get(controller.get)
  .post(controller.create)

router
  .route('/:id')
  .get(controller.getById)
  .put(controller.update)  
  .delete(controller.remove);

export default router;
