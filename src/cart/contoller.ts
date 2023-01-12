import { Router } from 'express';
import { CartService } from './service';
import { APIError } from '../common/error';
import { ItemService } from '../items/service';

const cartRouter = Router();

const service = new CartService();

cartRouter.post<
  Record<string, never>,
  {},
  { itemIds: number[]; coupon?: string }
>('/calculate', async (request, response) => {
  try {
    console.log(request.body);
    const { itemIds, coupon } = request.body;
    const itemService = new ItemService();
    const items = await Promise.all(
      itemIds.map((id) => itemService.loadById(id))
    );
    const result = await service.calculate(items, { coupon });
    response.status(200).json(result);
    return;
  } catch (err) {
    console.error(err);
    if (err instanceof APIError) {
      response.status(err.code).json({ message: err.message });
      return;
    }
    response.status(500).json({ message: err });
  }
});

export default cartRouter;
