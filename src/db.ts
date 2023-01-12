import { Pool } from 'pg';

export const pool = new Pool({
  user: process.env.POSTGRES_USER ?? 'postgres',
  host: process.env.POSGTRES_HOST ?? 'localhost',
  database: process.env.POSTGRES_DB ?? 'postgres_db',
  password: process.env.POSTGRES_PASSWORD ?? 'password',
  port: 5432,
});
