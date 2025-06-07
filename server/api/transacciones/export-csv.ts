import { conectarSQLServer } from '../../db';
import { parse } from 'json2csv';

export default defineEventHandler(async (event) => {
  const pool = await conectarSQLServer();
  const result = await pool.request().query('SELECT * FROM transaccion');
  const csv = parse(result.recordset);
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="transacciones.csv"'
    }
  });
});
