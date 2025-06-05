import { conectarSQLServer } from '../../db';

export default defineEventHandler(async (event) => {
  const id = event?.context?.params?.id;
  console.log('ID recibido:', id);
  const body = await readBody(event);
  const pool = await conectarSQLServer();
  await pool.request()
    .input('id', id)
    .input('nombre', body.nombre)
    .input('apellido', body.apellido)
    .input('dni', body.dni)
    .input('telefono', body.telefono)
    .input('direccion', body.direccion)
    .input('email', body.email)
    .query('UPDATE clientes SET nombre=@nombre, apellido=@apellido, dni=@dni, telefono=@telefono, direccion=@direccion, email=@email WHERE id=@id');
  return { success: true };
});
