const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootuser208',
    database: 'EDI_db'
});

const connectToDB = () => {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                return reject(err);
            }
            console.log('Connected to the database!');
            resolve(connection);
        });
    });
};

const disconnectFromDB = () => {
    return new Promise((resolve, reject) => {
        connection.end((err) => {
            if (err) {
                return reject(err);
            }
            console.log('Disconnected from the database!');
            resolve();
        });
    });
};

const show =() => {
    connection.query('SELECT * FROM edi_table', function(err, rows, fields) {
        if (err) throw err;
        console.log('Data received from Db:\n');
        // rows.forEach(row => {
        //     console.log(`${row.id} ${row.segment_type} ${row.segment_data}`);
        // });
        console.log(rows);
    });
};

// connectToDB();
// show();

module.exports = {
    connectToDB,
    disconnectFromDB,
    connection
};