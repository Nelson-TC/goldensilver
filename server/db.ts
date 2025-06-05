import sql from 'mssql';

const config = {
  server: 'TC', // Nombre del servidor según tu captura
  authentication: {
    type: 'default',
    options: {
      userName: 'nuxt',
      password: 'nuxt123$'
    }
  },
  options: {
    encrypt: true, // Encryption: Mandatory
    trustServerCertificate: true, // Trust server certificate
    database: 'CasaDeEmpeno', // Nombre de la base de datos
  },
};

export async function conectarSQLServer() {
  try {
    const pool = await sql.connect(config);
    console.log('Conexión exitosa a SQL Server');
    return pool;
  } catch (err) {
    console.error('Error al conectar a SQL Server:', err);
    throw err;
  }
}
