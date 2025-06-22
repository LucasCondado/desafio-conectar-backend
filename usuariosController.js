const pool = require('../db'); // Ajuste o caminho se necessário

// Exemplo: pegar todos os usuários
async function getUsuarios(req, res) {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    return res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
}

module.exports = { getUsuarios };