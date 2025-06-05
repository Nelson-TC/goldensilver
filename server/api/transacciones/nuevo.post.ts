import { conectarSQLServer } from '../../db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const pool = await conectarSQLServer();
  await pool.request()
    .input('articulo_id', body.articulo_id)
    .input('tipo', body.tipo)
    .input('fecha', body.fecha)
    .input('monto', body.monto)
    .input('interes', body.interes)
    .input('fecha_limite', body.fecha_limite)
    .input('estado', body.estado)
    .input('articulos_id', body.articulos_id)
    .query('INSERT INTO transaccion (articulo_id, tipo, fecha, monto, interes, fecha_limite, estado, articulos_id) VALUES (@articulo_id, @tipo, @fecha, @monto, @interes, @fecha_limite, @estado, @articulos_id)');
  return { success: true };
});
