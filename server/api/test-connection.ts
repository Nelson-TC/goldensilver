import { conectarSQLServer } from '../db';

export default defineEventHandler(async (event) => {
  try {
    await conectarSQLServer();
    return { success: true, message: 'Conexión exitosa a SQL Server' };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, message: 'Error al conectar a SQL Server', error: errorMessage };
  }
});
