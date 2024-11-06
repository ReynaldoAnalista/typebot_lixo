const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', // ou seu host do banco de dados
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'seu_banco_de_dados'
  });  

  db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
    } else {
      console.log('Conectado ao banco de dados MySQL');
    }
  });
  