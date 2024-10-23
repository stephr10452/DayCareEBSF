const fs = require('fs')
const path = require('path');

const inputFile = path.join(__dirname, 'data.txt');
const outputFile = path.join(__dirname, 'data.json');

console.log(inputFile)
function convertTxtToJson() {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const lines = data.split('\n');
        const result = [];
        let block = {};

        lines.forEach(line => {
            // Clean up the line from whitespace and semicolons
            const trimmedLine = line.trim().replace(';', '');

            if (trimmedLine.startsWith('location.lat')) {
                block.lat = trimmedLine.split('=')[1].replace(/'/g, '');
            } else if (trimmedLine.startsWith('location.lon')) {
                block.lon = trimmedLine.split('=')[1].replace(/'/g, '');
            } else if (trimmedLine.startsWith('location.centerName')) {
                block.centerName = trimmedLine.split('=')[1].replace(/"/g, '');
            } else if (trimmedLine.startsWith('location.programType')) {
                block.programType = trimmedLine.split('=')[1].replace(/"/g, '');
            } else if (trimmedLine.startsWith('location.address')) {
                block.address = trimmedLine.split('=')[1].replace(/"/g, '');
            } else if (trimmedLine.startsWith('location.zipCode')) {
                block.zipCode = trimmedLine.split('=')[1].replace(/"/g, '');
            } else if (trimmedLine.startsWith('location.phone')) {
                block.phone = trimmedLine.split('=')[1].replace(/"/g, '');
            } else if (trimmedLine.startsWith('location.status')) {
                block.status = trimmedLine.split('=')[1].replace(/"/g, '');
            } else if (trimmedLine.startsWith('location.dcId')) {
                block.dcId = trimmedLine.split('=')[1].replace(/"/g, '');
            }

            // Once a block is finished, push it to the result array
            if (trimmedLine === '' && Object.keys(block).length > 0) {
                result.push(block);
                block = {}; // Reset for next block
            }
        });

        // Write the result array to a JSON file
        fs.writeFile(outputFile, JSON.stringify(result, null, 4), err => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('Data successfully written to data.json');
        });
    });
}

// Call the function
 console.log(convertTxtToJson());




// {
//     
//      [
//       {
//        "zipcode": "100344",
//        "centerName": "childcare center",
//        "program type":"Child Care - Pre School";
//        "address": "100 bronx ,ny,10452",
//        "phone": "718-344-9085",
//         "borough":"bronx"
//        
//       }
//      ]
//
//        
//     i want an array of objects that contain the data for individual day care centers 