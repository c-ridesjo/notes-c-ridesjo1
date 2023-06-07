var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var documentsRouter = require('./routes/documents');
const loginRouter = require('./routes/login');

var app = express();

app.locals.con = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'notes',
  password: 'notes',
  database: 'notes'
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.use('/', indexRouter);
app.use('/documents', documentsRouter);
app.use('/login', loginRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3000;  // port for backend

try {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error('Error starting the server:', error);
}

module.exports = app;