const mysql = require('mysql2');
const { connection } = require('./connect_dissconnect');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'username_here',
//     password: 'enter_password_here',
//     database: 'EDI_db'
// });

const createTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS edi_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            column1 VARCHAR(255),
            column2 VARCHAR(255),
            column3 VARCHAR(255),
            column4 VARCHAR(255),
            column5 VARCHAR(255),
            column6 VARCHAR(255),
            column7 VARCHAR(255),
            column8 VARCHAR(255),
            column9 VARCHAR(255)
        )
    `;
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Table created successfully.');
        }
    });
};

const insertData = (data) => {
    const sql = 'INSERT INTO edi_data (name, column1, column2, column3, column4, column5, column6, column7, column8, column9) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    data.forEach(item => {
        if (Object.keys(item).length <= 9) {
            const values = [
                item.name,
                item['1'] || '',
                item['2'] || '',
                item['3'] || '',
                item['4'] || '',
                item['5'] || '',
                item['6'] || '',
                item['7'] || '',
                item['8'] || '',
                item['9'] || ''
            ];
            connection.query(sql, values, (err, result) => {
                if (err) {
                    console.error('Error inserting data:', err);
                }
            });
        }
    });
};

module.exports = {
    createTable,
    insertData
};
// const insert_Data = () => {
//     const outputJsonFile = path.join(__dirname, '../parse', 'output.json');
//     fs.readFile(outputJsonFile, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading JSON file:', err);
//             return;
//         }

//         const jsonData = JSON.parse(data);


//         // Insert data into the table
//         insertData(jsonData);
//     });
// };
// insert_Data();
// createTable();
