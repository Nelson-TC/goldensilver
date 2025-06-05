import { conectarSQLServer } from '../../db';

export default defineEventHandler(async (event) => {
  const id = event?.context?.params?.id;
  const body = await readBody(event);
  const pool = await conectarSQLServer();
  await pool.request()
    .input('id', id)
    .input('articulo_id', body.articulo_id)
    .input('tipo', body.tipo)
    .input('fecha', body.fecha)
    .input('monto', body.monto)
    .input('interes', body.interes)
    .input('fecha_limite', body.fecha_limite)
    .input('estado', body.estado)
    .input('articulos_id', body.articulos_id)
    .query('UPDATE transaccion SET articulo_id=@articulo_id, tipo=@tipo, fecha=@fecha, monto=@monto, interes=@interes, fecha_limite=@fecha_limite, estado=@estado, articulos_id=@articulos_id WHERE id=@id');
  return { success: true };
});
