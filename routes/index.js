const express = require('express');
const app = express();
const router = express.Router();
// const mysql = require('mysql2');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
require('dotenv').config(); // Importa e configura o dotenv

app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL usando variáveis de ambiente
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connection = await pool.getConnection();


// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

/* GET home page */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST para inserir dados na tabela pesagem */
router.post('/set_data', function (req, res, next) {
  const { FUNCIONARIO, CLIENTE, DATA, UNIDADE, QTD_SACOS, VALOR_PESADO, TIPO, IMAGEM, IDPESAGEM } = req.body;

  const query = `
    INSERT INTO pesagem (FUNCIONARIO, CLIENTE, DATA, UNIDADE, QTD_SACOS, VALOR_PESADO, TIPO, IMAGEM, IDPESAGEM) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [FUNCIONARIO, CLIENTE, DATA, UNIDADE, QTD_SACOS, VALOR_PESADO, TIPO, IMAGEM, IDPESAGEM], (err, results) => {
    if (err) {
      console.error('Erro ao inserir a pesagem:', err);
      res.status(500).send('Erro ao inserir a pesagem');
    } else {
      res.status(201).send('Pesagem inserida com sucesso');
    }
  });
});

/* GET para buscar dados da tabela pesagem */
router.get('/get_data', function (req, res, next) {
  const query = 'SELECT * FROM pesagem';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro ao buscar dados');
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
