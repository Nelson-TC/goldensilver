import { conectarSQLServer } from '../../db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const pool = await conectarSQLServer();
  const result = await pool.request()
    .input('nombre', body.nombre)
    .input('apellido', body.apellido)
    .input('dni', body.dni)
    .input('telefono', body.telefono)
    .input('direccion', body.direccion)
    .input('email', body.email)
    .query('INSERT INTO clientes (nombre, apellido, dni, telefono, direccion, email) VALUES (@nombre, @apellido, @dni, @telefono, @direccion, @email)');
  return { success: true };
});
