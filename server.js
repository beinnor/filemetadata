'use strict';

const express = require('express');
const cors = require('cors');

// require and use "multer"...
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function (req, res) {
  res.json({greetings: 'Hello, API'});
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {

  if (req.file === undefined) {
    return next(new Error('No file choosen'));
  }

  let output = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };
  res.json(output);
});

// 404 error handler
app.use(function (req, res, next) {
  res.status(404);
  res.send('404: Not found');
});

// no file choosen error handler
app.use(function (err, req, res, next) {
  res.send(`Error: ${err.message}`);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
