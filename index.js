const csv = require('csv-parser');
const fs = require('fs');

let allData = []
let nRowsFiles = []


function parseCSV (csvFile) {

    let dataArr = []

    fs.createReadStream(csvFile)
    .pipe(csv())
    .on('data', (row) => {
        const processedRow = processRow(row)
        dataArr.push(processedRow)
        if ( dataArr.length <=1 )
            console.log(processedRow);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        allData = [...allData, ...dataArr]
        nRowsFiles.push(dataArr.length)
    });

}

function processRow ( row ){

    // delete unnecessary rows
    delete row.Name
    delete row.Open
    delete row.Close
    delete row.Volume

    // change SNo to append Symbol
    row.SNo = `${row.SNo}-${row.Symbol}`

    return row
}

parseCSV( "data/coin_Bitcoin.csv")
parseCSV( "data/coin_Dogecoin.csv")
parseCSV( "data/coin_Ethereum.csv")
