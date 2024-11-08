const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
require('dotenv').config(); // Importa e configura o dotenv

app.use(bodyParser.json());

// Configuração do pool de conexões com o banco de dados MySQL usando variáveis de ambiente
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/* GET home page */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST para inserir dados na tabela pesagem */
router.post('/set_data', async function (req, res, next) {
  const dataArray = req.body.ArrayLixo;

  // Verifica se dataArray existe e é um array
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    return res.status(400).send('Formato inválido: ArrayLixo deve ser um array contendo strings.');
  }

  const query = `
    INSERT INTO pesagem (FUNCIONARIO, CLIENTE, DATA, UNIDADE, QTD_SACOS, VALOR_PESADO, TIPO, IMAGEM, IDPESAGEM) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  let connection;
  try {
    connection = await pool.getConnection(); // Obtém uma conexão do pool

    // Itera sobre o array, processa e insere cada string individualmente
    for (const item of dataArray) {
      const [QTD_SACOS, VALOR_PESADO, TIPO, IMAGEM, FUNCIONARIO, CLIENTE, UNIDADE, DATA, IDPESAGEM] = item.split(',');

      await connection.query(query, [FUNCIONARIO, CLIENTE, DATA, UNIDADE, QTD_SACOS, VALOR_PESADO, TIPO, IMAGEM, IDPESAGEM]);
    }

    res.status(201).send('Pesagens inseridas com sucesso');
  } catch (err) {
    console.error('Erro ao inserir a pesagem:', err);
    res.status(500).send('Erro ao inserir a pesagem');
  } finally {
    if (connection) connection.release(); // Libera a conexão de volta ao pool
  }
});


router.post('/drop_data', async function (req, res, next) {

  const query = `
    DELETE FROM pesagem WHERE 1=1`;

  let connection;
  try {
    connection = await pool.getConnection(); // Obtém uma conexão do pool
    await connection.query(query);
    res.status(201).send('Pesagem REMOVIDAS');
  } catch (err) {
    console.error('Erro ao remover a pensagem:', err);
    res.status(500).send('Erro ao remover a pensagem');
  } finally {
    if (connection) connection.release(); // Libera a conexão de volta ao pool
  }
})

/* GET para buscar dados da tabela pesagem */
router.get('/get_data', async function (req, res, next) {
  const query = 'SELECT * FROM pesagem';

  let connection;
  try {
    connection = await pool.getConnection(); // Obtém uma conexão do pool
    const [results] = await connection.query(query);
    res.status(200).json(results);
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    res.status(500).send('Erro ao buscar dados');
  } finally {
    if (connection) connection.release(); // Libera a conexão de volta ao pool
  }
});

module.exports = router;
