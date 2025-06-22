const pool = require('./db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err);
  } else {
    console.log('Conexão bem-sucedida!', res.rows);
  }
  pool.end();
});