import { conectarSQLServer } from '../../db';

export default defineEventHandler(async (event) => {
  const id = event?.context?.params?.id;
  const body = await readBody(event);
  const pool = await conectarSQLServer();
  await pool.request()
    .input('id', id)
    .input('articulo_id', body.articulo_id)
    .input('estado', body.estado)
    .input('fecha_alta', body.fecha_alta)
    .input('valor_tasado', body.valor_tasado)
    .input('descripcion', body.descripcion)
    .input('clientes_id', body.clientes_id)
    .query('UPDATE articulos SET articulo_id=@articulo_id, estado=@estado, fecha_alta=@fecha_alta, valor_tasado=@valor_tasado, descripcion=@descripcion, clientes_id=@clientes_id WHERE id=@id');
  return { success: true };
});
