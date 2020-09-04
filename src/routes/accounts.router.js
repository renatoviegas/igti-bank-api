import express from 'express';
import controller from '../controllers/accounts.controller.js';

const router = express.Router();

router.route('/')
  .get(controller.get)
  .post(controller.create)
  .delete(controller.close)

router.get('/byAccount', controller.getByAccount);    
router.get('/avgByAgency', controller.getAvgByAgency);  
router.get('/countAccountByAgency', controller.getCountAccountByAgency);  
router.get('/balance', controller.balance);
router.put('/transfer', controller.transfer);
router.put('/deposit', controller.deposit);
router.put('/withdraw', controller.withdraw);

router
  .route('/:id')
  .get(controller.getById)
  .put(controller.update);

export default router;
