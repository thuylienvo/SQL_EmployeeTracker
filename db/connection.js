// get the client
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Rymi505$MML?!475^2H2bs',
      database: 'employeeTracker'
});


// Start server after DB connection
connection.connect(err => {
    if (err) throw err;
    // console.log('Database connected.');
  });


module.exports = connection;