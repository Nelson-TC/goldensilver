import { conectarSQLServer } from '../db';

export default defineEventHandler(async (event) => {
  const pool = await conectarSQLServer();
  const result = await pool.request().query('SELECT * FROM articulos');
  return result.recordset;
});
