import { conectarSQLServer } from '../db';

export default defineEventHandler(async (event) => {
  const pool = await conectarSQLServer();
  const [clientes, articulos, transacciones, ultimosClientes, ultimosArticulos, prestamosActivos, totalPrestado, totalInteres, articulosEmpeñados, articulosVendidos, transaccionesPorMes] = await Promise.all([
    pool.request().query('SELECT COUNT(*) as total FROM clientes'),
    pool.request().query('SELECT COUNT(*) as total FROM articulos'),
    pool.request().query('SELECT COUNT(*) as total FROM transaccion'),
    pool.request().query('SELECT TOP 5 id, nombre, apellido, dni FROM clientes ORDER BY id DESC'),
    pool.request().query('SELECT TOP 5 id, descripcion, clientes_id FROM articulos ORDER BY id DESC'),
    pool.request().query("SELECT COUNT(*) as total FROM transaccion WHERE tipo = 'empeño' AND estado = 'activo'"),
    pool.request().query("SELECT ISNULL(SUM(monto),0) as total FROM transaccion WHERE tipo = 'empeño' AND estado = 'activo'"),
    pool.request().query("SELECT ISNULL(SUM(interes),0) as total FROM transaccion WHERE tipo = 'empeño' AND estado = 'activo'"),
    pool.request().query("SELECT COUNT(*) as total FROM articulos WHERE estado = 'empeñado'"),
    pool.request().query("SELECT COUNT(*) as total FROM articulos WHERE estado = 'vendido'"),
    pool.request().query(`SELECT FORMAT(fecha, 'yyyy-MM') as mes, COUNT(*) as total FROM transaccion GROUP BY FORMAT(fecha, 'yyyy-MM') ORDER BY mes DESC`)
  ]);
  return {
    clientes: clientes.recordset[0].total,
    articulos: articulos.recordset[0].total,
    transacciones: transacciones.recordset[0].total,
    ultimosClientes: ultimosClientes.recordset,
    ultimosArticulos: ultimosArticulos.recordset,
    prestamosActivos: prestamosActivos.recordset[0].total,
    totalPrestado: totalPrestado.recordset[0].total,
    totalInteres: totalInteres.recordset[0].total,
    articulosEmpeñados: articulosEmpeñados.recordset[0].total,
    articulosVendidos: articulosVendidos.recordset[0].total,
    transaccionesPorMes: transaccionesPorMes.recordset
  };
});
