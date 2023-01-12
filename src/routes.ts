import { Router } from 'express';
import itemRotuer from './items/controller';
import cartRouter from './cart/contoller';

const router = Router({ strict: true });

router.use((request, _, next) => {
  console.log(`request incoming: ${request.path}`);
  next();
});

router.use('/items', itemRotuer);
router.use('/carts', cartRouter);
export default router;
