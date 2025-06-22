const pool = require('./db');

// Exemplo: pegar todos os usuários
async function getUsuarios(req, res) {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
}

module.exports = { getUsuarios };