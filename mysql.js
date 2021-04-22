const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '7895',
  database : 'myboard'
});

connection.connect();

connection.query('SELECT * from topic', function (error, results, fields) {
  if (error){
    console.log(error);
  } 
  console.log(results);
});

connection.end();