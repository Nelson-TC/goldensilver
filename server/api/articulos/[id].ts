import { conectarSQLServer } from '../../db';

export default defineEventHandler(async (event) => {
  const id = event.context?.params?.id;
  const pool = await conectarSQLServer();
  const result = await pool.request().input('id', id).query('SELECT * FROM articulos WHERE id = @id');
  return result.recordset[0] || null;
});
