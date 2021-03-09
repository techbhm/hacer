const express = require("express");
const app = express();
const connection = require('tedious').Connection;
const request = require('tedious').Request;

//set up the connection information
const config = {
    server: 'db',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: 'HacerDevelopment2019',
        }
    },
    options: {
        database: 'hacer',
        port: 1433
    }
};

/** From https://github.com/twright-msft/mssql-node-docker-demo-app/ */
app.get('/', function (req, res) {
    let data = [];
    let conn = new connection(config);

    conn.on('connect', function(err) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }

        const sqlreq = new request("select * from test_table", function(err, rowCount) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`rowCount: ${rowCount}`)
        });

        sqlreq.on('row', function(columns) {
            let rowData = [];
            columns.forEach(function(column) {
                const colValue = (column.value === null)? 'NULL': column.value;
                rowData.push(colValue);
            });

            console.log(rowData.join('\t'));
            data.push(rowData);
        });
        sqlreq.on('requestCompleted', (rowCount, more) => {
            res.json(data);
        });

        conn.execSql(sqlreq);
    });
});

const server = app.listen(8080, function () {
    console.log("Listening on port %s...", server.address().port);
});
