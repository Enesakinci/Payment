var Connection = require('tedious').Connection;
var config = {
    server: 'localhost', //update me
    authentication: {
        type: 'default',
        options: {
            userName: '', //update me
            password: '.' //update me
        }
    },
    options: {
        encrypt: true,
        database: 'Exam' //update me
    }
};
var connection = new Connection(config);
connection.on('connect', function(err) {
    // If no error, then good to proceed.
    console.log("Connected");
});

module.exports = connection;