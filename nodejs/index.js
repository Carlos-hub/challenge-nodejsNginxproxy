const express = require('express');

const app = express();

app.use(express.json())
const config = {
    host: 'db',
    user: 'root',
    password: 'nodedb',
    database: 'nodedb'
}

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const verifyExistTable = `SHOW TABLES LIKE 'people`

if(verifyExistTable.length >0){
    console.log('table ok');
}else{
    const createTable = `CREATE TABLE people (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );`
    
    connection.query(createTable);    
}



const sql = `INSERT INTO people(name) values('Carlos')`
connection.query(sql);



app.get('/',async (req,res)=>{
    const sql = `SELECT * FROM people`
    connection.query(sql, (err, results) => {
        if (err) {
          console.error('Erro na consulta: ' + err.message);
          connection.end(); // Feche a conexão em caso de erro
          return;
        }
    
        // Iterar pelos resultados e imprimir campos individuais
        results.forEach((row) => {
          console.log('ID:', row.id);
          console.log('Nome:', row.name);
          return res.send(`
          <h1> FULL CYCLE ROCKS!!!<br/>
          ID ${row.id}<br/>
          Nome: ${row.name}
          `)
          // Adicione mais campos conforme necessário
        });
    
        connection.end(); // Feche a conexão após a consulta
      });
    //   return res.send("<h1> FULL CYCLE ROCKS!!!")
});



app.listen(3000,()=>{
    console.log('olá mundo');
});
