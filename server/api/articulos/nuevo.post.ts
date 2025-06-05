import { conectarSQLServer } from '../../db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const pool = await conectarSQLServer();
  await pool.request()
    .input('articulo_id', body.articulo_id)
    .input('estado', body.estado)
    .input('fecha_alta', body.fecha_alta)
    .input('valor_tasado', body.valor_tasado)
    .input('descripcion', body.descripcion)
    .input('clientes_id', body.clientes_id)
    .query('INSERT INTO articulos (articulo_id, estado, fecha_alta, valor_tasado, descripcion, clientes_id) VALUES (@articulo_id, @estado, @fecha_alta, @valor_tasado, @descripcion, @clientes_id)');
  return { success: true };
});
