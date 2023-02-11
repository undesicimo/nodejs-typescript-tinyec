import { Router } from 'express';
import { ItemService } from './service';
import { APIError } from '../common/error';

const itemRouter = Router();

const service = new ItemService();

itemRouter.get('/', async (request, response) => {
    try {
        const items = await service.loadAllItems();
        response.status(200).json(items);
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

export default itemRouter;
