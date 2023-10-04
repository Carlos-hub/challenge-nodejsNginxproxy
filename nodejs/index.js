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


const verifyExistTable = `SHOW TABLES LIKE 'people';`
const tableExist =  connection.query(verifyExistTable);
if(tableExist){
    console.log('table ok');
}else{
    const createTable = `CREATE TABLE people (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );`
    connection.query(createTable);
}
    

function tableExists(tableName) {
    return new Promise((resolve, reject) => {
        const verifyExistTable = `SHOW TABLES LIKE ?`;
        connection.query(verifyExistTable, [tableName], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.length > 0);
            }
        });
    });
}

// Função para criar a tabela
function createTable() {
    const createTableQuery = `CREATE TABLE people (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );`;
    return new Promise((resolve, reject) => {
        connection.query(createTableQuery, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

app.get('/', async (req, res) => {
    try {
        const exists = await tableExists('people');
        if (!exists) {
            await createTable();
        }

        const sqli = `INSERT INTO people(name) VALUES('Carlos')`;
        connection.query(sqli);

        const sql = `SELECT * FROM people`;
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Erro na consulta: ' + err.message);
                connection.end();
                return res.status(500).json({ error: 'Erro na consulta.' });
            }

            const retornaClient = [];
            results.forEach((row) => {
                retornaClient.push(row.id, row.name);
            });

            return res.send(`
                <h1> FULL CYCLE ROCKS!!!<br/>
                ${retornaClient.join(', ')}
            `);
        });
    } catch (error) {
        console.error('Erro: ' + error.message);
        return res.status(500).json({ error: 'Erro interno.' });
    }
});

app.listen(3000, () => {
    console.log('Servidor ouvindo na porta 3000');
});