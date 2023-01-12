import { Pool } from 'pg';
import { pool } from '../db';
import { Item } from './types';

export class ItemDao {
  constructor(private readonly database: Pool = pool) {}

  async loadAll(): Promise<Item[]> {
    const result = await this.database.query<Item>(
      'select * from items order by id'
    );
    return result.rows;
  }
  async loadById(id: number): Promise<Item | undefined> {
    const result = await this.database.query<Item>(
      `select * from items where id = $1`,
      [id]
    );
    if (!result.rowCount) {
      return;
    }
    return result.rows[0];
  }
}
