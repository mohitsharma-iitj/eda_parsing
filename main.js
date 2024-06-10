const fs = require('fs');
const path = require('path');
const { connectToDB, disconnectFromDB } = require('./sql/connect_dissconnect');
const { parseEDIFile } = require('./parse/parser');
const { createTable, insertData } = require('./sql/db_operation');



// Main function to handle the workflow
const connect = async () => {
    try {
        // Connect to the database
        await connectToDB();
    } catch (err) {
        console.error('Error during database operation:', err);
    }
};



// Main function to handle the workflow
const disconnect = async () => {
    try {
        // Connect to the database
        await disconnectFromDB();
    } catch (err) {
        console.error('Error during database operation:', err);
    }
};

// Parse the EDI file and write the JSON output
const parse_EDIFile = () => {
    parseEDIFile('./parse/MDC_856_Sample.txt', './parse/output.json', (err) => {
        if (err) {
            console.error('Error during parsing:', err);
        } else {
            console.log('Parsing completed successfully.');
        }
    });
};

// create table
const create_Table = () => {
    createTable();
};


// Read the JSON file
const insert_Data = () => {
    const outputJsonFile = path.join(__dirname, 'parse', 'output.json');
    fs.readFile(outputJsonFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }

        const jsonData = JSON.parse(data);

        // Insert data into the table
        insertData(jsonData);
    });
};




// Start the process
// connect();
// parse_EDIFile();
// create_Table();
// insert_Data();
disconnect();