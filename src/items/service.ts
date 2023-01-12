import { APIError } from '../common/error';
import { ItemDao } from './dao';

export class ItemService {
  constructor(private readonly dao: ItemDao = new ItemDao()) {}

  async loadAllItems() {
    return this.dao.loadAll();
  }

  async loadById(id: number) {
    const item = await this.dao.loadById(id);
    if (!item) {
      throw new APIError({
        code: 400,
        message: 'Not Found Error',
      });
    }
    return item;
  }
}
