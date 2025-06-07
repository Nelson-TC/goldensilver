import { conectarSQLServer } from '../../db';
import ExcelJS from 'exceljs';

export default defineEventHandler(async (event) => {
  const pool = await conectarSQLServer();
  const result = await pool.request().query('SELECT * FROM clientes');

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Clientes');
  worksheet.columns = Object.keys(result.recordset[0] || {id: ''}).map(key => ({ header: key, key }));
  result.recordset.forEach(row => worksheet.addRow(row));

  const buffer = await workbook.xlsx.writeBuffer();
  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="clientes.xlsx"'
    }
  });
});
