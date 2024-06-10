const { X12parser } = require('x12-parser');
const { createReadStream, writeFile } = require('fs');

const parseEDIFile = (inputFilePath, outputFilePath, callback) => {
    const myParser = new X12parser();
    myParser.on('error', err => {
        console.error(err);
    });

    const ediFile = createReadStream(inputFilePath);
    ediFile.on('error', err => {
        console.error(err);
    });

    const parsedData = [];

    ediFile.pipe(myParser).on('data', data => {
        parsedData.push(data);
    }).on('end', () => {
        const jsonData = JSON.stringify(parsedData, null, 2);

        writeFile(outputFilePath, jsonData, (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                if (callback) callback(err);
            } else {
                console.log('JSON file has been created successfully.');
                if (callback) callback(null);
            }
        });
    });
};

module.exports = {
    parseEDIFile
};
