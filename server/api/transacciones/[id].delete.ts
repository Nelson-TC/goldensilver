import { conectarSQLServer } from '../../db';

export default defineEventHandler(async (event) => {
  const id = event?.context?.params?.id;
  const pool = await conectarSQLServer();
  await pool.request().input('id', id).query('DELETE FROM transaccion WHERE id = @id');
  return { success: true };
});
